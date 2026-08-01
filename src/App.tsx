import { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './components/Header';
import BankFilterSidebar from './components/BankFilterSidebar';
import AverageRateCard from './components/AverageRateCard';
import LeadCaptureDialog from './components/LeadCaptureDialog';
import HomePage from './pages/HomePage';
import BankPage from './pages/BankPage';
import { useBankReturnDetector } from './hooks/useBankReturnDetector';
import { averageRate } from './data/loans';

function App() {
  const [hasActiveCredit, setHasActiveCredit] = useState(true);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const handleReturnFromBank = useCallback(() => setLeadFormOpen(true), []);
  const markPendingBankReturn = useBankReturnDetector(handleReturnFromBank);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header hasActiveCredit={hasActiveCredit} onToggleCreditStatus={setHasActiveCredit} />
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
          <Route path="/" element={<HomePage hasActiveCredit={hasActiveCredit} />} />
          <Route
            path="/bancos/:bankSlug"
            element={<BankPage hasActiveCredit={hasActiveCredit} onProductSelect={markPendingBankReturn} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <LeadCaptureDialog open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </Box>
  );
}

export default App;
