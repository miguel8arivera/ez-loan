import type { Loan } from '../types/loan';

export const banks = ['BCP', 'Interbank', 'Scotiabank', 'BBVA'] as const;

export const loans: Loan[] = [
  {
    id: 'bcp-50k-60',
    bank: 'BCP',
    badge: { label: 'Best Rate', variant: 'rate' },
    amount: 50000,
    interestRate: 8.5,
    termMonths: 60,
    monthlyPayment: 992,
    totalCost: 59520,
  },
  {
    id: 'interbank-50k-48',
    bank: 'Interbank',
    badge: { label: 'Best Term', variant: 'term' },
    amount: 50000,
    interestRate: 9.2,
    termMonths: 48,
    monthlyPayment: 1156,
    totalCost: 55488,
  },
  {
    id: 'scotiabank-50k-60',
    bank: 'Scotiabank',
    amount: 50000,
    interestRate: 8.9,
    termMonths: 60,
    monthlyPayment: 1018,
    totalCost: 61080,
  },
  {
    id: 'bbva-50k-60',
    bank: 'BBVA',
    amount: 50000,
    interestRate: 9.5,
    termMonths: 60,
    monthlyPayment: 1025,
    totalCost: 61500,
  },
  {
    id: 'bcp-100k-72',
    bank: 'BCP',
    badge: { label: 'Best Total', variant: 'total' },
    amount: 100000,
    interestRate: 7.8,
    termMonths: 72,
    monthlyPayment: 1622,
    totalCost: 116784,
  },
];

export const averageRate = 8.78;
