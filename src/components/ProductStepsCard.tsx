import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { BankProduct } from '../types/bankProduct';

export default function ProductStepsCard({ product }: { product: BankProduct }) {
  return (
    <Box
      sx={{
        bgcolor: 'surface.elevated',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 2.5,
        height: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 2.5 }}>
        Cómo obtenerlo
      </Typography>
      <Stack spacing={2.25}>
        {product.steps.map((step, index) => (
          <Box key={step} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mt: '1px',
              }}
            >
              {index + 1}
            </Box>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.5 }}>
              {step}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
