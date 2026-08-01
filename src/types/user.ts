import type { DocumentType } from './registration';

export interface RegisteredUser {
  status: 'registered';
  firstName: string;
  lastName: string;
  documentType: DocumentType;
  documentNumber: string;
  email: string;
}

export interface GuestUser {
  status: 'guest';
}

/** null means the user hasn't chosen an entry mode yet (show the welcome gate). */
export type UserSession = RegisteredUser | GuestUser | null;
