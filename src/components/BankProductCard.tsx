import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TbCircleCheckFilled } from 'react-icons/tb';
import type { BankProduct } from '../types/bankProduct';
import { productIcons } from './productIcons';

interface BankProductCardProps {
  product: BankProduct;
  onSelect?: (product: BankProduct) => void;
}

export default function BankProductCard({ product, onSelect }: BankProductCardProps) {
  const handleClick = () => onSelect?.(product);
  const Icon = productIcons[product.id];

  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1.5,
            bgcolor: 'rgba(34, 211, 238, 0.14)',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {Icon && <Icon size={26} />}
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', lineHeight: 1.25 }}>
          {product.title}
        </Typography>
      </Box>

      <Stack spacing={2}>
        {product.features.map((feature) => (
          <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
            <TbCircleCheckFilled size={22} color="#22d3ee" style={{ marginTop: 2, flexShrink: 0 }} />
            <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.4 }}>
              {feature}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          mt: 'auto',
          pt: 2.5,
          borderTop: '1px solid',
          borderColor: 'surface.border',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Button
          variant="contained"
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 999,
            textTransform: 'none',
            px: 4,
            py: 1.1,
            width: { xs: '100%', sm: 'auto' },
            minWidth: 220,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          {product.ctaLabel}
        </Button>
        <Button
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          sx={{
            color: 'primary.main',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
          }}
        >
          {product.detailsLabel}
        </Button>
      </Box>
    </Box>
  );
}
