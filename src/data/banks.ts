export type BankId =
  | 'bcp'
  | 'interbank'
  | 'scotiabank'
  | 'bbva'
  | 'bn'
  | 'banbif'
  | 'pichincha'
  | 'mibanco'
  | 'falabella'
  | 'ripley';

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
  { id: 'bn', name: 'Banco de la Nación', url: 'https://www.bn.com.pe', color: '#003DA5' },
  { id: 'banbif', name: 'BanBif', url: 'https://www.banbif.com.pe', color: '#0072BC' },
  { id: 'pichincha', name: 'Banco Pichincha', url: 'https://www.pichincha.pe', color: '#FDB913' },
  { id: 'mibanco', name: 'Mibanco', url: 'https://www.mibanco.com.pe', color: '#E6007E' },
  { id: 'falabella', name: 'Banco Falabella', url: 'https://www.bancofalabella.pe', color: '#4C9A2A' },
  { id: 'ripley', name: 'Banco Ripley', url: 'https://www.bancoripley.com.pe', color: '#C8102E' },
];

export function findBankBySlug(slug: string | undefined): Bank | undefined {
  return banksList.find((bank) => bank.id === slug);
}

export function findBankByName(name: string): Bank | undefined {
  return banksList.find((bank) => bank.name.toLowerCase() === name.toLowerCase());
}
