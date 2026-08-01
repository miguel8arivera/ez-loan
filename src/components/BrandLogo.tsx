import Box from '@mui/material/Box';
import { TbBuildingBank } from 'react-icons/tb';

interface BrandLogoProps {
  size?: number;
}

/**
 * Temporary logo mark (real LoanHub logo pending — see src/assets/img/README.md).
 */
export default function BrandLogo({ size = 40 }: BrandLogoProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: size * 0.35,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <TbBuildingBank size={size * 0.6} />
    </Box>
  );
}
