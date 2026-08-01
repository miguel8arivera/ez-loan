import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import theme from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster theme="dark" richColors position="top-center" />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
