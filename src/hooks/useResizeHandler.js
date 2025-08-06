import { useEffect, useCallback, useRef } from 'react';

export const useResizeHandler = (onResize) => {
  const timeoutRef = useRef(null);

  const handleResize = useCallback(() => {
    // Clear existing timeout to debounce resize events
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce resize events to prevent rapid firing
    timeoutRef.current = setTimeout(() => {
      try {
        onResize();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Resize handler error:', error);
      }
    }, 100); // 100ms debounce
  }, [onResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);
};
