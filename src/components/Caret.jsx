import { useRef, useEffect } from 'react';
import { CARET_CONFIG } from '../constants';
import {
  useLineCalculation,
  useCaretState,
  useCaretAnimation,
  useResizeHandler,
} from '../hooks';
import '../styles/components/Caret.css';

const Caret = ({
  text,
  isPlaying,
  speed = CARET_CONFIG.DEFAULT_SPEED,
  caretColor = CARET_CONFIG.DEFAULT_COLOR,
  caretWidth = CARET_CONFIG.DEFAULT_WIDTH,
  caretHeight = null,
  className = '',
}) => {
  const textRef = useRef(null);

  // Custom hooks for different responsibilities
  const { lines, updateLines } = useLineCalculation();
  const { caret, active, updateCaret, stopAnimation } = useCaretState(isPlaying, lines);

  // Handle line calculation on text changes
  useEffect(() => {
    updateLines(textRef);
  }, [text, updateLines]);

  // Handle resize events
  useResizeHandler(() => {
    updateLines(textRef);
  });

  // Handle caret animation
  useCaretAnimation(active, lines, speed, caret, updateCaret, stopAnimation);

  // Caret visual settings
  const lineHeight = lines[caret.lineIdx]?.height || 24;
  const visualCaretHeight = caretHeight || lineHeight;

  return (
    <div className="caret-outer-container">
      <span
        ref={textRef}
        className="caret-text-content"
      >
        {text}
      </span>

      {lines.length > 0 && active && (
        <div
          className={`caret-bar ${className}`}
          style={{
            position: 'absolute',
            left: `${caret.x}px`,
            top: `${caret.y}px`,
            height: `${visualCaretHeight}px`,
            width: `${caretWidth}px`,
            background: caretColor,
            zIndex: 10,
            transition: 'none',
            pointerEvents: 'none',
            borderRadius: caretWidth > 3 ? '1px' : 0,
          }}
        />
      )}
    </div>
  );
};

export default Caret;
