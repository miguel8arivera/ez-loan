import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { toast } from 'sonner';
import RegistrationForm from './RegistrationForm';
import type { RegisteredUser } from '../types/user';

interface RegisterPromptDialogProps {
  open: boolean;
  onClose: () => void;
  onRegister: (data: Omit<RegisteredUser, 'status'>) => void;
}

export default function RegisterPromptDialog({
  open,
  onClose,
  onRegister,
}: RegisterPromptDialogProps) {
  const handleRegister = (data: Omit<RegisteredUser, 'status'>) => {
    onRegister(data);
    toast.success(`¡Gracias, ${data.firstName}! Tu cuenta quedó creada.`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700 }}>Regístrate para más oportunidades</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Vimos que estás interesado en un producto. Crea tu cuenta para que podamos ayudarte a
          dar seguimiento y avisarte de mejores oportunidades.
        </Typography>
        <RegistrationForm onRegister={handleRegister} submitLabel="Crear cuenta" />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Ahora no
        </Button>
      </DialogActions>
    </Dialog>
  );
}
