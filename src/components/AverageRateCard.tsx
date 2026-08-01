import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface AverageRateCardProps {
  rate: number;
}

export default function AverageRateCard({ rate }: AverageRateCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'primary.dark',
        borderRadius: 2,
        p: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon sx={{ color: 'primary.main', fontSize: 20 }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Average Rate
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{ color: 'primary.main', mt: 1, fontWeight: 700 }}
      >
        {rate}%
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Across all banks
      </Typography>
    </Box>
  );
}
