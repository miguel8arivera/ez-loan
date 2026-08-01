import { useCallback, useEffect, useState } from 'react';

export function useBankReturnDetector(onReturn: () => void) {
  const [awaitingReturn, setAwaitingReturn] = useState(false);

  useEffect(() => {
    if (!awaitingReturn) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setAwaitingReturn(false);
        onReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [awaitingReturn, onReturn]);

  const markPendingReturn = useCallback(() => setAwaitingReturn(true), []);

  return markPendingReturn;
}
