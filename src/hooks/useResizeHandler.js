import { useEffect, useCallback } from 'react';

export const useResizeHandler = (onResize) => {
  const handleResize = useCallback(() => {
    onResize();
  }, [onResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
};
