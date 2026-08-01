import bcpLogo from '../assets/img/bcp-seeklogo.png';
import interbankLogo from '../assets/img/interbank-seeklogo.png';
import scotiabankLogo from '../assets/img/Scotiabank.png';
import bbvaLogo from '../assets/img/bbva.png';
import type { BankId } from '../data/banks';

/**
 * Real bank logo images, as they become available (see src/assets/img/README.md).
 * Banks without an entry here fall back to the color monogram badge.
 */
export const bankLogos: Partial<Record<BankId, string>> = {
  bcp: bcpLogo,
  interbank: interbankLogo,
  scotiabank: scotiabankLogo,
  bbva: bbvaLogo,
};
