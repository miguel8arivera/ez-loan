import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TbBulb } from 'react-icons/tb';
import { bcpProducts } from '../data/bcpProducts';
import BcpProductCard from './BcpProductCard';
import ProductStepsCard from './ProductStepsCard';
import ProductVideoCard from './ProductVideoCard';
import type { BcpProduct } from '../types/bcpProduct';

interface BcpProductsPanelProps {
  onProductSelect?: (product: BcpProduct) => void;
}

const gridTemplateColumns = {
  xs: '1fr',
  lg: 'minmax(260px, 0.85fr) minmax(360px, 1.6fr) minmax(280px, 0.9fr)',
};

const columnLabels = ['PRODUCTO', 'CÓMO OBTENERLO', 'VIDEO'];

export default function BcpProductsPanel({ onProductSelect }: BcpProductsPanelProps) {
  return (
    <Box
      sx={{
        bgcolor: 'surface.main',
        border: '1px solid',
        borderColor: 'surface.border',
        borderRadius: 2,
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1.5,
            bgcolor: 'rgba(34, 211, 238, 0.14)',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <TbBulb size={24} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Aún no tienes un crédito activo
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
        Empieza tu camino con BCP: elige un producto y sigue los pasos para acceder a él, sin
        necesidad de experiencia previa con bancos.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns, columnGap: 3, rowGap: { xs: 1.5, lg: 3 } }}>
        {columnLabels.map((label, colIndex) => (
          <Typography
            key={label}
            sx={{
              display: { xs: 'none', lg: 'block' },
              gridColumn: colIndex + 1,
              gridRow: '1',
              color: 'text.primary',
              fontWeight: 800,
              fontSize: '1.4rem',
              letterSpacing: 0.5,
            }}
          >
            {label}
          </Typography>
        ))}

        {bcpProducts.map((product, index) => (
          <Box key={product.id} sx={{ display: 'contents' }}>
            <Box sx={{ gridColumn: { xs: 'auto', lg: '1' }, gridRow: { xs: 'auto', lg: index + 2 } }}>
              <BcpProductCard product={product} onSelect={onProductSelect} />
            </Box>
            <Box sx={{ gridColumn: { xs: 'auto', lg: '2' }, gridRow: { xs: 'auto', lg: index + 2 } }}>
              <ProductStepsCard product={product} />
            </Box>
            <Box sx={{ gridColumn: { xs: 'auto', lg: '3' }, gridRow: { xs: 'auto', lg: index + 2 } }}>
              <ProductVideoCard product={product} />
            </Box>
          </Box>
        ))}
      </Box>

      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 3 }}>
        Información referencial basada en condiciones públicas de BCP; montos, tasas y plazos
        pueden variar. Verifica siempre los detalles vigentes en viabcp.com antes de decidir.
      </Typography>
    </Box>
  );
}
