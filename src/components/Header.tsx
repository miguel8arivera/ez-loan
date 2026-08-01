import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CreditStatusToggle from './CreditStatusToggle';
import BrandLogo from './BrandLogo';
import type { UserSession } from '../types/user';

interface HeaderProps {
  hasActiveCredit: boolean;
  onToggleCreditStatus: (value: boolean) => void;
  session: UserSession;
  onRegisterClick: () => void;
}

export default function Header({
  hasActiveCredit,
  onToggleCreditStatus,
  session,
  onRegisterClick,
}: HeaderProps) {
  const initials =
    session?.status === 'registered'
      ? `${session.firstName.charAt(0)}${session.lastName.charAt(0)}`.toUpperCase()
      : 'IN';

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
        <BrandLogo size={36} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          LoanHub
        </Typography>
        {session?.status === 'registered' && (
          <CreditStatusToggle hasActiveCredit={hasActiveCredit} onChange={onToggleCreditStatus} />
        )}
        {session?.status === 'guest' && (
          <Button
            onClick={onRegisterClick}
            sx={{
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 600,
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          >
            Registrarte
          </Button>
        )}
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
          {initials}
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
