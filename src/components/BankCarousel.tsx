import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { banksList } from '../data/banks';
import BankMonogram from './BankMonogram';
import { bankLogos } from './bankLogos';

const track = [...banksList, ...banksList];

export default function BankCarousel() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          gap: 3,
          animation: 'bank-carousel-scroll 22s linear infinite',
          '@keyframes bank-carousel-scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
        }}
      >
        {track.map((bank, index) => {
          const logo = bankLogos[bank.id];

          return (
            <Box
              key={`${bank.id}-${index}`}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}
            >
              {logo ? (
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 1.5,
                    px: 1.75,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt={bank.name}
                    sx={{ height: 20, width: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </Box>
              ) : (
                <>
                  <BankMonogram bank={bank} size={26} />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
                  >
                    {bank.name}
                  </Typography>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
