export type BankId = 'bcp' | 'interbank' | 'scotiabank' | 'bbva';

export interface Bank {
  id: BankId;
  name: string;
  url: string;
}

export const banksList: Bank[] = [
  { id: 'bcp', name: 'BCP', url: 'https://www.viabcp.com' },
  { id: 'interbank', name: 'Interbank', url: 'https://interbank.pe' },
  { id: 'scotiabank', name: 'Scotiabank', url: 'https://www.scotiabank.com.pe' },
  { id: 'bbva', name: 'BBVA', url: 'https://www.bbva.pe' },
];

export function findBankBySlug(slug: string | undefined): Bank | undefined {
  return banksList.find((bank) => bank.id === slug);
}
