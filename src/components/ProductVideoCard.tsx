import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TbBrandYoutube } from 'react-icons/tb';
import type { BcpProduct } from '../types/bcpProduct';
import YouTubeEmbed from './YouTubeEmbed';

export default function ProductVideoCard({ product }: { product: BcpProduct }) {
  return (
    <Box
      sx={{
        bgcolor: 'surface.elevated',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
        <TbBrandYoutube size={18} color="#f87171" />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 0.5 }}>
          VIDEO
        </Typography>
      </Box>
      <YouTubeEmbed videoId={product.videoId} title={product.videoTitle} />
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1.25 }}>
        {product.videoTitle}
      </Typography>
    </Box>
  );
}
