import Chip from '@mui/material/Chip';
import type { LoanBadge as LoanBadgeType } from '../types/loan';

const variantStyles: Record<LoanBadgeType['variant'], { bg: string; color: string }> = {
  rate: { bg: 'rgba(34, 211, 238, 0.16)', color: '#67e8f9' },
  term: { bg: 'rgba(34, 211, 238, 0.16)', color: '#67e8f9' },
  total: { bg: 'rgba(245, 158, 11, 0.18)', color: '#fbbf24' },
};

export default function LoanBadge({ badge }: { badge: LoanBadgeType }) {
  const style = variantStyles[badge.variant];
  return (
    <Chip
      label={badge.label}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 600,
        fontSize: '0.7rem',
        height: 22,
      }}
    />
  );
}
