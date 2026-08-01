import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Loan } from '../types/loan';
import LoanBadge from './LoanBadge';
import { formatCurrency, formatPercent } from '../utils/format';

export default function LoanCard({ loan }: { loan: Loan }) {
  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        flex: 1,
        minWidth: 260,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 700 }}>{loan.bank}</Typography>
        {loan.badge && <LoanBadge badge={loan.badge} />}
      </Box>

      <Row label="Rate:" value={formatPercent(loan.interestRate)} valueColor="primary.main" />
      <Row label="Term:" value={`${loan.termMonths}m`} />
      <Row label="Payment:" value={formatCurrency(loan.monthlyPayment)} />

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        Details
      </Button>
    </Box>
  );
}

function Row({
  label,
  value,
  valueColor = 'text.primary',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: valueColor, fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
}
