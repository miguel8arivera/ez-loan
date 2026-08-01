import { TbFileCheck, TbCoins, TbPigMoney } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import type { BankProductCategory } from '../types/bankProduct';

export const productIcons: Record<BankProductCategory, IconType> = {
  'credit-history': TbFileCheck,
  'plans-terms': TbCoins,
  'fixed-term-deposit': TbPigMoney,
};
