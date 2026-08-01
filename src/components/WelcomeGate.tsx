import { useState, type MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TbHelpCircle, TbCircleCheckFilled } from 'react-icons/tb';
import { toast } from 'sonner';
import RegistrationForm from './RegistrationForm';
import BrandLogo from './BrandLogo';
import BankCarousel from './BankCarousel';
import type { RegisteredUser } from '../types/user';

const valueProps = [
  'Compara tasas, plazos y cuotas de los principales bancos del Perú en un solo lugar.',
  'Aprende paso a paso cómo acceder a tu primer crédito, aunque nunca hayas trabajado con un banco.',
  'Guías y videos con información real de cada entidad, no solo publicidad.',
];

interface WelcomeGateProps {
  onRegister: (data: Omit<RegisteredUser, 'status'>) => void;
  onGuest: () => void;
}

export default function WelcomeGate({ onRegister, onGuest }: WelcomeGateProps) {
  const [helpAnchor, setHelpAnchor] = useState<HTMLElement | null>(null);

  const handleRegister = (data: Omit<RegisteredUser, 'status'>) => {
    onRegister(data);
    toast.success(`¡Bienvenido, ${data.firstName}!`);
  };

  const openHelp = (event: MouseEvent<HTMLElement>) => setHelpAnchor(event.currentTarget);
  const closeHelp = () => setHelpAnchor(null);

  const handleGuestFromHelp = () => {
    closeHelp();
    onGuest();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: '0 0 42%',
          minWidth: 0,
          overflow: 'hidden',
          p: 6,
          background:
            'linear-gradient(160deg, rgba(34, 211, 238, 0.16) 0%, rgba(8, 11, 18, 1) 60%)',
          borderRight: '1px solid',
          borderColor: 'surface.border',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <BrandLogo size={36} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            LoanHub
          </Typography>
        </Box>

        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15, mb: 2 }}>
            Compara préstamos y construye tu historial
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 440, mb: 3 }}>
            LoanHub nació para las personas que sienten que el mundo bancario es confuso.
            Reunimos en un solo lugar la oferta de los bancos más importantes del Perú, para que
            puedas comparar y entender exactamente qué te conviene, sin letra pequeña.
          </Typography>

          <Stack spacing={1.5}>
            {valueProps.map((text) => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                <TbCircleCheckFilled
                  size={20}
                  color="#22d3ee"
                  style={{ marginTop: 2, flexShrink: 0 }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 380 }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', letterSpacing: 1, fontWeight: 600, mb: 1.5, display: 'block' }}
          >
            BANCOS DISPONIBLES
          </Typography>
          <BankCarousel />
        </Box>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            px: { xs: 3, sm: 5 },
            py: 3,
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <BrandLogo size={30} />
            <Typography sx={{ fontWeight: 700 }}>LoanHub</Typography>
          </Box>

          <Button
            onClick={openHelp}
            startIcon={<TbHelpCircle size={18} />}
            sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}
          >
            ¿Necesitas ayuda?
          </Button>

          <Popover
            open={!!helpAnchor}
            anchorEl={helpAnchor}
            onClose={closeHelp}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  bgcolor: 'surface.elevated',
                  border: '1px solid',
                  borderColor: 'surface.border',
                  borderRadius: 2,
                  p: 2.5,
                  maxWidth: 300,
                },
              },
            }}
          >
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              ¿No quieres crear una cuenta todavía? Puedes explorar LoanHub primero como invitado
              y registrarte más adelante, cuando quieras.
            </Typography>
            <Button
              fullWidth
              onClick={handleGuestFromHelp}
              variant="outlined"
              sx={{
                borderColor: 'primary.dark',
                color: 'primary.main',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { bgcolor: 'surface.main', borderColor: 'primary.dark' },
              }}
            >
              Entrar como invitado
            </Button>
          </Popover>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 3, sm: 5 },
            pb: 6,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Empieza gratis
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Crea tu cuenta para guardar tu progreso y recibir mejores oportunidades.
            </Typography>

            <RegistrationForm onRegister={handleRegister} submitLabel="Crear cuenta y entrar" />

            <Divider sx={{ my: 3, borderColor: 'surface.border' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                O
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={onGuest}
              sx={{
                borderColor: 'surface.border',
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.1,
                '&:hover': { bgcolor: 'surface.elevated', borderColor: 'surface.border' },
              }}
            >
              Entrar como invitado
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
