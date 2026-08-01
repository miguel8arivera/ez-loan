import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { Loan } from '../types/loan';
import LoanBadge from './LoanBadge';
import { formatCurrency, formatPercent, formatTerm } from '../utils/format';

interface LoanTableProps {
  loans: Loan[];
}

interface ColumnDef {
  key: string;
  label: string;
  icon?: ReactNode;
  align?: 'left' | 'right';
}

const columns: ColumnDef[] = [
  { key: 'bank', label: 'BANK' },
  { key: 'amount', label: 'AMOUNT', icon: <AttachMoneyIcon sx={{ fontSize: 16 }} /> },
  { key: 'interestRate', label: 'INTEREST RATE', icon: <PercentIcon sx={{ fontSize: 16 }} /> },
  { key: 'term', label: 'TERM', icon: <CalendarMonthIcon sx={{ fontSize: 16 }} /> },
  { key: 'monthlyPayment', label: 'MONTHLY PAYMENT', align: 'right' },
  { key: 'totalCost', label: 'TOTAL COST', align: 'right' },
];

export default function LoanTable({ loans }: LoanTableProps) {
  return (
    <TableContainer
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align ?? 'left'}
                sx={{
                  color: 'text.secondary',
                  borderColor: 'surface.border',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {col.icon}
                  {col.label}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow
              key={loan.id}
              sx={{
                '&:last-child td': { borderBottom: 0 },
                '&:hover': { bgcolor: 'surface.elevated' },
              }}
            >
              <TableCell sx={{ borderColor: 'surface.border' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{loan.bank}</Typography>
                  {loan.badge && <LoanBadge badge={loan.badge} />}
                </Box>
              </TableCell>
              <TableCell sx={{ borderColor: 'surface.border' }}>
                {formatCurrency(loan.amount)}
              </TableCell>
              <TableCell sx={{ borderColor: 'surface.border' }}>
                <Chip
                  label={formatPercent(loan.interestRate)}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(34, 211, 238, 0.12)',
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                  }}
                />
              </TableCell>
              <TableCell sx={{ borderColor: 'surface.border' }}>
                {formatTerm(loan.termMonths)}
              </TableCell>
              <TableCell align="right" sx={{ borderColor: 'surface.border' }}>
                <Typography sx={{ fontWeight: 700 }}>{formatCurrency(loan.monthlyPayment)}</Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderColor: 'surface.border', color: 'text.secondary' }}>
                {formatCurrency(loan.totalCost)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
