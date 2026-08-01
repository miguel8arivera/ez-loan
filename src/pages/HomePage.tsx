import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SearchSortBar from '../components/SearchSortBar';
import LoanTable from '../components/LoanTable';
import LoanCard from '../components/LoanCard';
import ChooseBankPrompt from '../components/ChooseBankPrompt';
import { loans } from '../data/loans';

interface HomePageProps {
  hasActiveCredit: boolean;
}

export default function HomePage({ hasActiveCredit }: HomePageProps) {
  const [search, setSearch] = useState('');

  const filteredLoans = useMemo(() => {
    const query = search.trim().toLowerCase();
    return loans.filter((loan) => loan.bank.toLowerCase().includes(query));
  }, [search]);

  const highlightLoans = loans.slice(0, 3);

  return (
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
        <ChooseBankPrompt />
      )}
    </Stack>
  );
}
