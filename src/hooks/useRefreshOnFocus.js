import { useEffect, useRef } from 'react';

export function useRefreshOnFocus(refetch) {
  const firstTimeRef = useRef(true);

  useEffect(() => {
    const handleFocus = () => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);
}
