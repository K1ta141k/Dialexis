import { useState, useEffect, useRef, useCallback } from 'react';

const useColumnHeight = () => {
  const [columnHeight, setColumnHeight] = useState(0);
  const textColumnRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const updateHeight = useCallback(() => {
    if (textColumnRef.current) {
      const height = textColumnRef.current.offsetHeight;
      setColumnHeight(height);

      // Set CSS custom property for use in other components
      document.documentElement.style.setProperty('--text-column-height', `${height}px`);
    }
  }, []);

  useEffect(() => {
    // Initial height calculation
    updateHeight();

    // Create ResizeObserver to watch for height changes with error handling
    try {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // Use requestAnimationFrame to prevent ResizeObserver loop errors
        requestAnimationFrame(() => {
          if (!Array.isArray(entries) || entries.length === 0) return;
          updateHeight();
        });
      });

      if (textColumnRef.current) {
        resizeObserverRef.current.observe(textColumnRef.current);
      }
    } catch (error) {
      // Fallback to window resize if ResizeObserver is not supported
      // eslint-disable-next-line no-console
      console.warn('ResizeObserver not supported, falling back to window resize');
      window.addEventListener('resize', updateHeight);
    }

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener('resize', updateHeight);
      }
    };
  }, [updateHeight]);

  return { textColumnRef, columnHeight };
};

export default useColumnHeight;
