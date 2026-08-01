import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import BankFilterSidebar from './components/BankFilterSidebar';
import AverageRateCard from './components/AverageRateCard';
import SearchSortBar from './components/SearchSortBar';
import LoanTable from './components/LoanTable';
import LoanCard from './components/LoanCard';
import BcpProductsPanel from './components/BcpProductsPanel';
import LeadCaptureDialog from './components/LeadCaptureDialog';
import { useBankReturnDetector } from './hooks/useBankReturnDetector';
import { averageRate, loans } from './data/loans';

function App() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [hasActiveCredit, setHasActiveCredit] = useState(true);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  const handleReturnFromBank = useCallback(() => setLeadFormOpen(true), []);
  const markPendingBankReturn = useBankReturnDetector(handleReturnFromBank);

  const handleSelectBank = (bank: string) => {
    setSelectedBank((current) => (current === bank ? null : bank));
  };

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesBank = !selectedBank || loan.bank === selectedBank;
      const matchesSearch = loan.bank.toLowerCase().includes(search.trim().toLowerCase());
      return matchesBank && matchesSearch;
    });
  }, [selectedBank, search]);

  const highlightLoans = loans.slice(0, 3);

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
          <BankFilterSidebar selectedBank={selectedBank} onSelectBank={handleSelectBank} />
          <AverageRateCard rate={averageRate} />
        </Box>

        <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
          <SearchSortBar searchValue={search} onSearchChange={setSearch} />

          {hasActiveCredit ? (
            <>
              <Box sx={{ overflowX: 'auto' }}>
                <LoanTable loans={filteredLoans} />
              </Box>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                {highlightLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))}
              </Stack>
            </>
          ) : (
            <BcpProductsPanel onProductSelect={markPendingBankReturn} />
          )}
        </Stack>
      </Box>

      <LeadCaptureDialog open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </Box>
  );
}

export default App;
