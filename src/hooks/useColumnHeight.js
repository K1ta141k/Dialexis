import { useState, useEffect, useRef } from 'react';

const useColumnHeight = () => {
  const [columnHeight, setColumnHeight] = useState(0);
  const textColumnRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (textColumnRef.current) {
        const height = textColumnRef.current.offsetHeight;
        setColumnHeight(height);

        // Set CSS custom property for use in other components
        document.documentElement.style.setProperty('--text-column-height', `${height}px`);
      }
    };

    // Initial height calculation
    updateHeight();

    // Create ResizeObserver to watch for height changes
    const resizeObserver = new ResizeObserver(updateHeight);

    if (textColumnRef.current) {
      resizeObserver.observe(textColumnRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { textColumnRef, columnHeight };
};

export default useColumnHeight;
