import { useRef, useEffect, useState, useCallback } from 'react';
import { CARET_CONFIG } from '../constants';
import '../styles/components/Caret.css';

const Caret = ({
  text,
  isPlaying,
  speed = CARET_CONFIG.DEFAULT_SPEED,          // pixels per second
  caretColor = CARET_CONFIG.DEFAULT_COLOR,
  caretWidth = CARET_CONFIG.DEFAULT_WIDTH,
  caretHeight = null,             // will use line height by default
  className = '',
}) => {
  const textRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [caret, setCaret] = useState({ x: 0, y: 0, lineIdx: 0 });
  const [active, setActive] = useState(false);

  // Function to calculate lines
  const calculateLines = useCallback(() => {
    if (!textRef.current) return;

    const boundingRect = textRef.current.getBoundingClientRect();
    const computedStyles = window.getComputedStyle(textRef.current);

    // Use getClientRects() for line detection, but calculate exact width for last line
    const rects = Array.from(textRef.current.getClientRects());
    let calculatedLines = [];

    if (rects.length === 1) {
      // Single bounding box - calculate individual lines manually
      const lineHeight = parseFloat(computedStyles.lineHeight) || parseFloat(computedStyles.fontSize) * CARET_CONFIG.DEFAULT_LINE_HEIGHT_MULTIPLIER;
      const containerWidth = boundingRect.width;
      const textContent = textRef.current.textContent;

      // Create a temporary canvas to measure text
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.font = `${computedStyles.fontSize} ${computedStyles.fontFamily}`;

      const words = textContent.split(' ');
      let currentLine = '';
      let currentLineIndex = 0;
      const lineTexts = []; // Track the actual text content for each line

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
        const metrics = ctx.measureText(testLine);

        if (metrics.width > containerWidth && currentLine !== '') {
          // Line is full - use container width for all lines except the last
          lineTexts.push(currentLine); // Store the text content for this line
          calculatedLines.push({
            left: boundingRect.left,
            right: boundingRect.right,
            top: boundingRect.top + (currentLineIndex * lineHeight),
            bottom: boundingRect.top + ((currentLineIndex + 1) * lineHeight),
            width: containerWidth,
            height: lineHeight,
            x: boundingRect.left,
            y: boundingRect.top + (currentLineIndex * lineHeight),
          });
          currentLine = words[i];
          currentLineIndex++;
        } else {
          currentLine = testLine;
        }
      }

      // Add the final line with exact width using DOM measurement
      if (currentLine) {
        // Create a temporary DOM element to measure the last line accurately
        const lastLineElement = document.createElement('span');
        lastLineElement.textContent = currentLine;
        lastLineElement.style.cssText = `
          position: absolute;
          visibility: hidden;
          white-space: nowrap;
          font-family: ${computedStyles.fontFamily};
          font-size: ${computedStyles.fontSize};
          font-weight: ${computedStyles.fontWeight};
          font-style: ${computedStyles.fontStyle};
          letter-spacing: ${computedStyles.letterSpacing};
          word-spacing: ${computedStyles.wordSpacing};
          text-transform: ${computedStyles.textTransform};
          padding: ${computedStyles.padding};
          margin: ${computedStyles.margin};
          box-sizing: ${computedStyles.boxSizing};
        `;

        // Temporarily add to DOM to measure
        document.body.appendChild(lastLineElement);
        const lastLineRect = lastLineElement.getBoundingClientRect();
        document.body.removeChild(lastLineElement);

        calculatedLines.push({
          left: boundingRect.left,
          right: boundingRect.left + lastLineRect.width,
          top: boundingRect.top + (currentLineIndex * lineHeight),
          bottom: boundingRect.top + ((currentLineIndex + 1) * lineHeight),
          width: lastLineRect.width,
          height: lineHeight,
          x: boundingRect.left,
          y: boundingRect.top + (currentLineIndex * lineHeight),
        });
      }
    } else {
      // Multiple rects from getClientRects() - use them directly
      calculatedLines = rects;
    }

    if (calculatedLines.length) {
      setLines(calculatedLines);
      setCaret({
        x: calculatedLines[0].left,
        y: calculatedLines[0].top,
        lineIdx: 0,
      });
    }
  }, []);

  // Measure line rectangles after render
  useEffect(() => {
    calculateLines();
  }, [text, calculateLines]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateLines]);

  // Reset caret if text or isPlaying changes
  useEffect(() => {
    if (!isPlaying) {
      if (lines.length)
        setCaret({
          x: lines[0]?.left || 0,
          y: lines[0]?.top || 0,
          lineIdx: 0,
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

        // How far to move in this frame
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
        setActive(false);
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
    // eslint-disable-next-line
  }, [active, lines, speed]);

  // Compute container offsets for absolute caret positioning
  const containerRect = lines[0] || { left: 0, top: 0 };

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

      {/* Temporary line boxes for debugging */}
      {/* {lines.map((line, index) => (
        <div
          key={`line-${line.top}-${line.left}`}
          style={{
            position: 'absolute',
            left: `${line.left - containerRect.left}px`,
            top: `${line.top - containerRect.top}px`,
            width: `${line.width}px`,
            height: `${line.height}px`,
            border: '2px solid red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            zIndex: 5,
            pointerEvents: 'none',
            fontSize: '10px',
            color: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Line {index}
        </div>
      ))} */}

      {lines.length > 0 && active && (
        <div
          className={`caret-bar ${className}`}
          style={{
            position: 'absolute',
            left: `${caret.x - containerRect.left}px`,
            top: `${caret.y - containerRect.top}px`,
            height: `${visualCaretHeight}px`,
            width: `${caretWidth}px`,
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
