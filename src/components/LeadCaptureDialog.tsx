import { useState, type ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'sonner';
import { leadFormSchema, occupationTypes } from '../types/lead';

interface LeadCaptureDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  salary: string;
  occupationType: '' | (typeof occupationTypes)[number];
  phone: string;
  email: string;
}

const initialState: FormState = { salary: '', occupationType: '', phone: '', email: '' };

const occupationLabels: Record<(typeof occupationTypes)[number], string> = {
  dependiente: 'Dependiente',
  independiente: 'Independiente',
};

export default function LeadCaptureDialog({ open, onClose }: LeadCaptureDialogProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleClose = () => {
    if (submitting) return;
    setForm(initialState);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const result = leadFormSchema.safeParse(form);

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
    try {
      // Integration point for the real lead-capture endpoint once the backend exists.
      console.log('Lead capturado:', result.data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('¡Gracias! Un asesor de BCP se pondrá en contacto contigo.');
      handleClose();
    } catch {
      toast.error('No pudimos enviar tus datos', {
        description: 'Ocurrió un problema al procesar tu solicitud. Intenta nuevamente.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700 }}>Cuéntanos un poco más de ti</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Con estos datos, un asesor de BCP podrá ayudarte a encontrar el producto ideal para ti.
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Sueldo mensual (S/.)"
            value={form.salary}
            onChange={handleChange('salary')}
            error={!!errors.salary}
            helperText={errors.salary}
            slotProps={{ htmlInput: { inputMode: 'numeric' } }}
            fullWidth
          />
          <TextField
            select
            label="Tipo de ocupación"
            value={form.occupationType}
            onChange={handleChange('occupationType')}
            error={!!errors.occupationType}
            helperText={errors.occupationType}
            fullWidth
          >
            {occupationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {occupationLabels[type]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Celular"
            value={form.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 9 } }}
            fullWidth
          />
          <TextField
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={submitting}>
          Ahora no
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
