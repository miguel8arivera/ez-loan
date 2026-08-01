export type BankProductCategory = 'credit-history' | 'plans-terms' | 'fixed-term-deposit';

export interface BankProduct {
  id: BankProductCategory;
  title: string;
  features: string[];
  steps: string[];
  ctaLabel: string;
  detailsLabel: string;
  url: string;
  videoId: string;
  videoTitle: string;
}
