import { useState, type ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { toast } from 'sonner';
import { registerAccount } from '../api/account';
import {
  documentTypeLabels,
  documentTypes,
  registrationSchema,
} from '../types/registration';
import type { RegisteredUser } from '../types/user';

interface FormState {
  firstName: string;
  lastName: string;
  documentType: '' | (typeof documentTypes)[number];
  documentNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  documentType: '',
  documentNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface RegistrationFormProps {
  onRegister: (data: Omit<RegisteredUser, 'status'>) => void;
  submitLabel?: string;
}

export default function RegistrationForm({
  onRegister,
  submitLabel = 'Crear cuenta',
}: RegistrationFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async () => {
    const result = registrationSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormState;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error('Revisa los datos ingresados', {
        description: 'Hay campos con información incompleta o inválida.',
      });
      return;
    }

    setSubmitting(true);
    const apiResult = await registerAccount(result.data);
    setSubmitting(false);

    if (apiResult.ok) {
      onRegister(apiResult.user);
      return;
    }

    if (apiResult.kind === 'validation') {
      setErrors(apiResult.fieldErrors);
      toast.error('Revisa los datos ingresados', {
        description: 'El servidor encontró datos inválidos.',
      });
      return;
    }

    if (apiResult.kind === 'conflict') {
      setErrors({ email: apiResult.message, documentNumber: apiResult.message });
      toast.error('No pudimos crear tu cuenta', { description: apiResult.message });
      return;
    }

    toast.error('No pudimos crear tu cuenta', { description: apiResult.message });
  };

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Nombre"
          value={form.firstName}
          onChange={handleChange('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
        />
        <TextField
          label="Apellido"
          value={form.lastName}
          onChange={handleChange('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          select
          label="Tipo de documento"
          value={form.documentType}
          onChange={handleChange('documentType')}
          error={!!errors.documentType}
          helperText={errors.documentType}
          sx={{ minWidth: { sm: 200 } }}
          fullWidth
        >
          {documentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {documentTypeLabels[type]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Número de documento"
          value={form.documentNumber}
          onChange={handleChange('documentNumber')}
          error={!!errors.documentNumber}
          helperText={errors.documentNumber}
          fullWidth
        />
      </Stack>

      <TextField
        label="Correo electrónico"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <TextField
          label="Confirmar contraseña"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />
      </Stack>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting}
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          py: 1.1,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        {submitting ? 'Creando cuenta...' : submitLabel}
      </Button>
    </Stack>
  );
}
