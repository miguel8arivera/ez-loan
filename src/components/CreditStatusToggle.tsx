import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

interface CreditStatusToggleProps {
  hasActiveCredit: boolean;
  onChange: (value: boolean) => void;
}

export default function CreditStatusToggle({ hasActiveCredit, onChange }: CreditStatusToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        border: '1px dashed',
        borderColor: 'surface.border',
        borderRadius: 2,
        px: 1,
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
        DEMO:
      </Typography>
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Switch
            size="small"
            checked={hasActiveCredit}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {hasActiveCredit ? 'Con crédito' : 'Sin crédito'}
          </Typography>
        }
      />
    </Box>
  );
}
