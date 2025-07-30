import React, { useRef, useEffect, useState } from 'react';
import '../styles/components/Caret.css';

const Caret = ({
  text,
  isPlaying,
  speed = 120,          // pixels per second
  caretColor = '#1f2937',
  caretWidth = 2,
  caretHeight = null,             // will use line height by default
  className = ''
}) => {
  const textRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [caret, setCaret] = useState({ x: 0, y: 0, lineIdx: 0 });
  const [active, setActive] = useState(false);

  // Measure line rectangles after render
  useEffect(() => {
    if (!textRef.current) return;
    const rects = Array.from(textRef.current.getClientRects());
    if (rects.length) {
      setLines(rects);
      setCaret({
        x: rects[0].left,
        y: rects[0].top,
        lineIdx: 0,
      });
    }
  }, [text]);

  // Reset caret if text or isPlaying changes
  useEffect(() => {
    if (!isPlaying) {
      if (lines.length)
        setCaret({
          x: lines[0]?.left || 0,
          y: lines[0]?.top || 0,
          lineIdx: 0
        });
      setActive(false);
    } else {
      setActive(true);
    }
  }, [isPlaying, text, lines]);

  // Animate caret movement
  useEffect(() => {
    if (!active || !lines.length) return;
    let rafId = null;
    let prevTimestamp = null;

    const step = (timestamp) => {
      if (!prevTimestamp) prevTimestamp = timestamp;
      const dt = (timestamp - prevTimestamp) / 1000; // seconds since last frame
      prevTimestamp = timestamp;

      setCaret(prev => {
        const { x, y, lineIdx } = prev;
        const line = lines[lineIdx];
        if (!line) return prev;

        const maxX = line.right;
        const minX = line.left;

        // How far to move in this frame
        let nextX = x + speed * dt;

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
            lineIdx: lineIdx + 1
          };
        }

        // Otherwise, stop at the end
        setActive(false);
        return {
          x: maxX,
          y,
          lineIdx
        };
      });

      if (active) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => rafId && cancelAnimationFrame(rafId);
    // eslint-disable-next-line
  }, [active, lines, speed]);

  // Compute container offsets for absolute caret positioning
  let containerRect = lines[0] || { left: 0, top: 0 };

  // Caret visual settings
  const lineHeight = lines[caret.lineIdx]?.height || 24;
  const visualCaretHeight = caretHeight || lineHeight;

  return (
    <div className="caret-outer-container" style={{ position: 'relative', display: 'inline-block' }}>
      <span
        ref={textRef}
        className="caret-text-content"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', display: 'inline-block' }}
      >
        {text}
      </span>
      {lines.length > 0 && (
        <div
          className={`caret-bar ${className}`}
          style={{
            position: 'absolute',
            left: (caret.x - containerRect.left) + 'px',
            top: (caret.y - containerRect.top) + 'px',
            height: visualCaretHeight + 'px',
            width: caretWidth + 'px',
            background: caretColor,
            zIndex: 10,
            transition: 'none', // Caret moves smoothly by JS, not CSS transitions
            pointerEvents: 'none', // So it doesn't block selection/clicks
            borderRadius: caretWidth > 3 ? '1px' : 0,
          }}
        />
      )}
    </div>
  );
};

export default Caret;
