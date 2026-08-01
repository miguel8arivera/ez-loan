import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SearchSortBar from '../components/SearchSortBar';
import LoanTable from '../components/LoanTable';
import LoanCard from '../components/LoanCard';
import BankProductsPanel from '../components/BankProductsPanel';
import { findBankBySlug } from '../data/banks';
import { loans } from '../data/loans';
import type { BankProduct } from '../types/bankProduct';

interface BankPageProps {
  hasActiveCredit: boolean;
  onProductSelect: (product: BankProduct) => void;
}

export default function BankPage({ hasActiveCredit, onProductSelect }: BankPageProps) {
  const { bankSlug } = useParams<{ bankSlug: string }>();
  const [search, setSearch] = useState('');
  const bank = findBankBySlug(bankSlug);

  const bankLoans = useMemo(() => {
    if (!bank) return [];
    const query = search.trim().toLowerCase();
    return loans.filter((loan) => loan.bank === bank.name && loan.bank.toLowerCase().includes(query));
  }, [bank, search]);

  if (!bank) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
      <SearchSortBar searchValue={search} onSearchChange={setSearch} />

      {hasActiveCredit ? (
        <>
          <Box sx={{ overflowX: 'auto' }}>
            <LoanTable loans={bankLoans} />
          </Box>

          {bankLoans.length > 0 && (
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              {bankLoans.slice(0, 3).map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </Stack>
          )}
        </>
      ) : (
        <BankProductsPanel bankId={bank.id} onProductSelect={onProductSelect} />
      )}
    </Stack>
  );
}
