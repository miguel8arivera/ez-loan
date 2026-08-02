import type { DocumentType, RegistrationFormData } from '../types/registration';
import type { RegisteredUser } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Must match ez-loganAPI's Models/DocumentType.cs enum values.
const documentTypeToApiValue: Record<DocumentType, number> = {
  dni: 1,
  ce: 2,
};

interface RegisterApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  documentNumber: string;
  email: string;
}

interface ValidationProblemDetails {
  errors?: Record<string, string[]>;
}

type RegistrationField = keyof RegistrationFormData;

export type RegisterResult =
  | { ok: true; user: Omit<RegisteredUser, 'status'> }
  | { ok: false; kind: 'validation'; fieldErrors: Partial<Record<RegistrationField, string>> }
  | { ok: false; kind: 'conflict' | 'network' | 'unknown'; message: string };

export async function registerAccount(data: RegistrationFormData): Promise<RegisterResult> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/account/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        documentType: documentTypeToApiValue[data.documentType],
        documentNumber: data.documentNumber,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });
  } catch {
    return {
      ok: false,
      kind: 'network',
      message: 'No se pudo conectar con el servidor. Verifica que la API esté corriendo.',
    };
  }

  if (response.status === 201) {
    const created = (await response.json()) as RegisterApiResponse;
    return {
      ok: true,
      user: {
        firstName: created.firstName,
        lastName: created.lastName,
        documentType: data.documentType,
        documentNumber: created.documentNumber,
        email: created.email,
      },
    };
  }

  if (response.status === 409) {
    const body = (await response.json()) as { message: string };
    return { ok: false, kind: 'conflict', message: body.message };
  }

  if (response.status === 400) {
    const problem = (await response.json()) as ValidationProblemDetails;
    const fieldErrors: Partial<Record<RegistrationField, string>> = {};
    for (const [key, messages] of Object.entries(problem.errors ?? {})) {
      const field = (key.charAt(0).toLowerCase() + key.slice(1)) as RegistrationField;
      fieldErrors[field] = messages[0];
    }
    return { ok: false, kind: 'validation', fieldErrors };
  }

  return {
    ok: false,
    kind: 'unknown',
    message: 'Ocurrió un error inesperado. Intenta nuevamente.',
  };
}
