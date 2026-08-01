import { useState, type MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CreditStatusToggle from './CreditStatusToggle';
import BrandLogo from './BrandLogo';
import type { UserSession } from '../types/user';

interface HeaderProps {
  hasActiveCredit: boolean;
  onToggleCreditStatus: (value: boolean) => void;
  session: UserSession;
  onRegisterClick: () => void;
  onLogout: () => void;
}

export default function Header({
  hasActiveCredit,
  onToggleCreditStatus,
  session,
  onRegisterClick,
  onLogout,
}: HeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const initials =
    session?.status === 'registered'
      ? `${session.firstName.charAt(0)}${session.lastName.charAt(0)}`.toUpperCase()
      : 'IN';

  const openMenu = (event: MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

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
        <IconButton onClick={openMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}>
            {initials}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {session?.status === 'registered' && (
            <MenuItem disabled sx={{ opacity: '1 !important', fontWeight: 600 }}>
              {session.firstName} {session.lastName}
            </MenuItem>
          )}
          {session?.status === 'registered' && <Divider />}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
