import Box from '@mui/material/Box';
import type { Bank } from '../data/banks';

interface BankMonogramProps {
  bank: Bank;
  size?: number;
}

export default function BankMonogram({ bank, size = 28 }: BankMonogramProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: bank.color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontWeight: 700,
        fontSize: size * 0.42,
        lineHeight: 1,
      }}
    >
      {bank.name.charAt(0)}
    </Box>
  );
}
