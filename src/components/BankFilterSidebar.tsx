import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import { banksList } from '../data/banks';

export default function BankFilterSidebar() {
  const { bankSlug } = useParams<{ bankSlug?: string }>();

  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', letterSpacing: 1, fontWeight: 600 }}
      >
        FILTER BY BANK
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
        {banksList.map((bank) => {
          const isSelected = bank.id === bankSlug;
          return (
            <ButtonBase
              key={bank.id}
              component={Link}
              to={isSelected ? '/' : `/bancos/${bank.id}`}
              sx={{
                justifyContent: 'flex-start',
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                bgcolor: isSelected ? 'surface.elevated' : 'transparent',
                borderLeft: '3px solid',
                borderLeftColor: isSelected ? 'error.main' : 'transparent',
                color: isSelected ? 'text.primary' : 'text.secondary',
                fontWeight: isSelected ? 700 : 500,
                transition: 'background-color 0.15s ease',
                '&:hover': {
                  bgcolor: 'surface.elevated',
                },
              }}
            >
              {bank.name}
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
