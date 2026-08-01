export type BankId = 'bcp' | 'interbank' | 'scotiabank' | 'bbva';

export interface Bank {
  id: BankId;
  name: string;
  url: string;
  /** Approximate official brand color, used for the bank's monogram badge. */
  color: string;
}

export const banksList: Bank[] = [
  { id: 'bcp', name: 'BCP', url: 'https://www.viabcp.com', color: '#E74B23' },
  { id: 'interbank', name: 'Interbank', url: 'https://interbank.pe', color: '#009B3A' },
  { id: 'scotiabank', name: 'Scotiabank', url: 'https://www.scotiabank.com.pe', color: '#EC0712' },
  { id: 'bbva', name: 'BBVA', url: 'https://www.bbva.pe', color: '#14549C' },
];

export function findBankBySlug(slug: string | undefined): Bank | undefined {
  return banksList.find((bank) => bank.id === slug);
}

export function findBankByName(name: string): Bank | undefined {
  return banksList.find((bank) => bank.name.toLowerCase() === name.toLowerCase());
}
