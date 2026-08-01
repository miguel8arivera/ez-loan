import { useCallback, useState } from 'react';
import type { GuestUser, RegisteredUser, UserSession } from '../types/user';

const STORAGE_KEY = 'ezloan.session';

/**
 * Only registered sessions persist across reloads. Guest sessions are
 * intentionally disposable: refreshing the page (F5) sends a guest back to
 * the welcome gate, while a registered user stays logged in.
 */
function readStoredSession(): RegisteredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserSession;
    return parsed?.status === 'registered' ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredSession(session: RegisteredUser | null) {
  try {
    if (session === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — session just won't persist.
  }
}

export function useUserSession() {
  const [session, setSession] = useState<UserSession>(() => readStoredSession());

  const registerUser = useCallback((data: Omit<RegisteredUser, 'status'>) => {
    const next: RegisteredUser = { status: 'registered', ...data };
    setSession(next);
    writeStoredSession(next);
  }, []);

  const continueAsGuest = useCallback(() => {
    const next: GuestUser = { status: 'guest' };
    setSession(next);
  }, []);

  return { session, registerUser, continueAsGuest };
}
