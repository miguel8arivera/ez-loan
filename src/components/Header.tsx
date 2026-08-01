import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CreditStatusToggle from './CreditStatusToggle';

interface HeaderProps {
  hasActiveCredit: boolean;
  onToggleCreditStatus: (value: boolean) => void;
}

export default function Header({ hasActiveCredit, onToggleCreditStatus }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'surface.border',
      }}
    >
      <Toolbar sx={{ gap: 1.5, px: { xs: 2, md: 4 }, py: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          L
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          LoanHub
        </Typography>
        <CreditStatusToggle hasActiveCredit={hasActiveCredit} onChange={onToggleCreditStatus} />
        <IconButton
          sx={{
            border: '1px solid',
            borderColor: 'surface.border',
            borderRadius: 1.5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}>
          JD
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
