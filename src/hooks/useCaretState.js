import { useState, useEffect, useCallback } from 'react';

export const useCaretState = (isPlaying, lines) => {
  const [caret, setCaret] = useState({ x: 0, y: 0, lineIdx: 0 });
  const [active, setActive] = useState(false);

  // Reset caret if text or isPlaying changes
  useEffect(() => {
    if (!isPlaying) {
      if (lines.length) {
        setCaret({
          x: lines[0]?.left || 0,
          y: lines[0]?.top || 0,
          lineIdx: 0,
        });
      }
      setActive(false);
    } else {
      setActive(true);
    }
  }, [isPlaying, lines]);

  const resetCaret = useCallback(() => {
    if (lines.length) {
      setCaret({
        x: lines[0]?.left || 0,
        y: lines[0]?.top || 0,
        lineIdx: 0,
      });
    }
  }, [lines]);

  const updateCaret = useCallback((newCaret) => {
    setCaret(newCaret);
  }, []);

  const stopAnimation = useCallback(() => {
    setActive(false);
  }, []);

  return {
    caret,
    active,
    resetCaret,
    updateCaret,
    stopAnimation,
  };
};
