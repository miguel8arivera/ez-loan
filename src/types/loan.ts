export type LoanBadgeVariant = 'rate' | 'term' | 'total';

export interface LoanBadge {
  label: string;
  variant: LoanBadgeVariant;
}

export interface Loan {
  id: string;
  bank: string;
  badge?: LoanBadge;
  amount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalCost: number;
}
