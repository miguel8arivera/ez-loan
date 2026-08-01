import { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './components/Header';
import BankFilterSidebar from './components/BankFilterSidebar';
import AverageRateCard from './components/AverageRateCard';
import LeadCaptureDialog from './components/LeadCaptureDialog';
import RegisterPromptDialog from './components/RegisterPromptDialog';
import WelcomeGate from './components/WelcomeGate';
import HomePage from './pages/HomePage';
import BankPage from './pages/BankPage';
import { useBankReturnDetector } from './hooks/useBankReturnDetector';
import { useUserSession } from './hooks/useUserSession';
import { averageRate } from './data/loans';

function App() {
  const [hasActiveCredit, setHasActiveCredit] = useState(true);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [registerPromptOpen, setRegisterPromptOpen] = useState(false);

  const { session, registerUser, continueAsGuest } = useUserSession();

  const handleReturnFromBank = useCallback(() => {
    if (session?.status === 'guest') {
      setRegisterPromptOpen(true);
    } else if (session?.status === 'registered') {
      setLeadFormOpen(true);
    }
  }, [session]);
  const markPendingBankReturn = useBankReturnDetector(handleReturnFromBank);

  if (!session) {
    return <WelcomeGate onRegister={registerUser} onGuest={continueAsGuest} />;
  }

  // Only registered users can have an "active credit" tracked — guests always
  // see the product-acquisition flow, since there's no account to check.
  const isRegistered = session.status === 'registered';
  const effectiveHasActiveCredit = isRegistered && hasActiveCredit;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header
        hasActiveCredit={hasActiveCredit}
        onToggleCreditStatus={setHasActiveCredit}
        session={session}
        onRegisterClick={() => setRegisterPromptOpen(true)}
      />
      <Box sx={{ display: 'flex', gap: 3, p: { xs: 2, md: 4 }, alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: { md: 260, lg: 300, xl: 320 },
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <BankFilterSidebar />
          <AverageRateCard rate={averageRate} />
        </Box>

        <Routes>
          <Route path="/" element={<HomePage hasActiveCredit={effectiveHasActiveCredit} />} />
          <Route
            path="/bancos/:bankSlug"
            element={
              <BankPage
                hasActiveCredit={effectiveHasActiveCredit}
                onProductSelect={markPendingBankReturn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <LeadCaptureDialog open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
      <RegisterPromptDialog
        open={registerPromptOpen}
        onClose={() => setRegisterPromptOpen(false)}
        onRegister={registerUser}
      />
    </Box>
  );
}

export default App;
