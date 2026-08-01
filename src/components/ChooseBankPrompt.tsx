import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { banksList } from '../data/banks';
import BankMonogram from './BankMonogram';

export default function ChooseBankPrompt() {
  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Elige un banco para empezar
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
        Selecciona un banco para ver sus productos y los pasos para acceder a tu primer crédito.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
        {banksList.map((bank) => (
          <Box
            key={bank.id}
            component={Link}
            to={`/bancos/${bank.id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.1,
              borderRadius: 999,
              border: '1px solid',
              borderColor: 'primary.dark',
              color: 'primary.main',
              fontWeight: 700,
              textDecoration: 'none',
              '&:hover': { bgcolor: 'surface.elevated' },
            }}
          >
            <BankMonogram bank={bank} size={24} />
            {bank.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
