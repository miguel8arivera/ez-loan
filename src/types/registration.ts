import { z } from 'zod';

export const documentTypes = ['dni', 'ce'] as const;

export const documentTypeLabels: Record<(typeof documentTypes)[number], string> = {
  dni: 'DNI',
  ce: 'Carné de Extranjería',
};

export type DocumentType = (typeof documentTypes)[number];

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, 'Ingresa tu nombre')
      .max(60, 'El nombre es demasiado largo'),
    lastName: z
      .string()
      .trim()
      .min(2, 'Ingresa tu apellido')
      .max(60, 'El apellido es demasiado largo'),
    documentType: z.enum(documentTypes, {
      message: 'Selecciona un tipo de documento',
    }),
    documentNumber: z.string().trim(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Ingresa un correo electrónico válido')
      .max(254, 'El correo es demasiado largo'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Za-z]/, 'La contraseña debe incluir al menos una letra')
      .regex(/\d/, 'La contraseña debe incluir al menos un número'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .check((ctx) => {
    const { documentType, documentNumber, password, confirmPassword } = ctx.value;
    if (documentType === 'dni' && !/^\d{8}$/.test(documentNumber)) {
      ctx.issues.push({
        code: 'custom',
        message: 'El DNI debe tener exactamente 8 dígitos',
        path: ['documentNumber'],
        input: documentNumber,
      });
    }
    if (documentType === 'ce' && !/^[A-Za-z0-9]{6,12}$/.test(documentNumber)) {
      ctx.issues.push({
        code: 'custom',
        message: 'El Carné de Extranjería debe tener entre 6 y 12 caracteres alfanuméricos',
        path: ['documentNumber'],
        input: documentNumber,
      });
    }
    if (confirmPassword !== password) {
      ctx.issues.push({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
        input: confirmPassword,
      });
    }
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
