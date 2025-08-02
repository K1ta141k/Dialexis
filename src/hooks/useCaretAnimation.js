import { useEffect } from 'react';

export const useCaretAnimation = (active, lines, speed, caret, onCaretUpdate, onAnimationComplete) => {
  useEffect(() => {
    if (!active || !lines.length) return;

    let rafId = null;
    let prevTimestamp = null;

    const step = (timestamp) => {
      if (!prevTimestamp) prevTimestamp = timestamp;
      const dt = (timestamp - prevTimestamp) / 1000;
      prevTimestamp = timestamp;

      onCaretUpdate(prev => {
        const { x, y, lineIdx } = prev;
        const line = lines[lineIdx];
        if (!line) return prev;

        const maxX = line.right;
        const nextX = x + speed * dt;

        // If the caret is still in this line, just move
        if (nextX < maxX) {
          return { x: nextX, y, lineIdx };
        }

        // Otherwise, go to next line if it exists
        if (lineIdx + 1 < lines.length) {
          const nextLine = lines[lineIdx + 1];
          return {
            x: nextLine.left,
            y: nextLine.top,
            lineIdx: lineIdx + 1,
          };
        }

        // Otherwise, stop at the end and hide the caret
        onAnimationComplete();
        return {
          x: maxX,
          y,
          lineIdx,
        };
      });

      if (active) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => rafId && cancelAnimationFrame(rafId);
  }, [active, lines, speed, onCaretUpdate, onAnimationComplete]);
};
