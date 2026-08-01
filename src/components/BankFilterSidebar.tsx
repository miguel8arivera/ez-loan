import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link, useMatch } from 'react-router-dom';
import { banksList } from '../data/banks';

export default function BankFilterSidebar() {
  const match = useMatch('/bancos/:bankSlug');
  const bankSlug = match?.params.bankSlug;

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
                justifyContent: 'space-between',
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                bgcolor: isSelected ? 'rgba(34, 211, 238, 0.14)' : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? 'rgba(34, 211, 238, 0.4)' : 'transparent',
                borderLeft: '4px solid',
                borderLeftColor: isSelected ? 'primary.main' : 'transparent',
                color: isSelected ? 'primary.main' : 'text.secondary',
                fontWeight: isSelected ? 700 : 500,
                boxShadow: isSelected ? '0 0 12px rgba(34, 211, 238, 0.25)' : 'none',
                transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                '&:hover': {
                  bgcolor: isSelected ? 'rgba(34, 211, 238, 0.18)' : 'surface.elevated',
                },
              }}
            >
              {bank.name}
              {isSelected && (
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    flexShrink: 0,
                  }}
                />
              )}
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
