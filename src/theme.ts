import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      main: string;
      elevated: string;
      border: string;
    };
    accentAmber: Palette['primary'];
  }
  interface PaletteOptions {
    surface?: {
      main: string;
      elevated: string;
      border: string;
    };
    accentAmber?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#04222b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#080b12',
      paper: '#0f151f',
    },
    text: {
      primary: '#e8ebf0',
      secondary: '#8891a1',
    },
    surface: {
      main: '#0f151f',
      elevated: '#131a26',
      border: '#1e2634',
    },
    accentAmber: {
      main: '#f59e0b',
      dark: '#b45309',
      contrastText: '#2b1a03',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, system-ui, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080b12',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
  },
});

export default theme;
