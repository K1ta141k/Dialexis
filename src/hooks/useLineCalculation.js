import { useCallback, useState } from 'react';
import {
  createTextMeasurementContext,
  measureTextWidth,
  createTemporaryElement,
  measureElementWidth,
  getLineHeight,
} from '../utils/textMeasurement';

export const useLineCalculation = () => {
  const [lines, setLines] = useState([]);

  const calculateLines = useCallback((textRef) => {
    if (!textRef?.current) return;

    const boundingRect = textRef.current.getBoundingClientRect();
    const computedStyles = window.getComputedStyle(textRef.current);

    // Use getClientRects() for line detection, but calculate exact width for last line
    const rects = Array.from(textRef.current.getClientRects());
    let calculatedLines = [];

    if (rects.length === 1) {
      // Single bounding box - calculate individual lines manually
      const lineHeight = getLineHeight(computedStyles);
      const containerWidth = boundingRect.width;
      const textContent = textRef.current.textContent;

      // Create text measurement context
      const ctx = createTextMeasurementContext(computedStyles);

      const words = textContent.split(' ');
      let currentLine = '';
      let currentLineIndex = 0;

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
        const metrics = measureTextWidth(testLine, ctx);

        if (metrics > containerWidth && currentLine !== '') {
          // Line is full - use container width for all lines except the last
          calculatedLines.push({
            left: 0,
            right: containerWidth,
            top: currentLineIndex * lineHeight,
            bottom: (currentLineIndex + 1) * lineHeight,
            width: containerWidth,
            height: lineHeight,
            x: 0,
            y: currentLineIndex * lineHeight,
          });
          currentLine = words[i];
          currentLineIndex++;
        } else {
          currentLine = testLine;
        }
      }

      // Add the final line with exact width using DOM measurement
      if (currentLine) {
        const lastLineElement = createTemporaryElement(currentLine, computedStyles);
        const lastLineWidth = measureElementWidth(lastLineElement);

        calculatedLines.push({
          left: 0,
          right: lastLineWidth,
          top: currentLineIndex * lineHeight,
          bottom: (currentLineIndex + 1) * lineHeight,
          width: lastLineWidth,
          height: lineHeight,
          x: 0,
          y: currentLineIndex * lineHeight,
        });
      }
    } else {
      // Multiple rects from getClientRects() - convert to container-relative
      calculatedLines = rects.map(rect => ({
        left: rect.left - boundingRect.left,
        right: rect.right - boundingRect.left,
        top: rect.top - boundingRect.top,
        bottom: rect.bottom - boundingRect.top,
        width: rect.width,
        height: rect.height,
        x: rect.left - boundingRect.left,
        y: rect.top - boundingRect.top,
      }));
    }

    return calculatedLines;
  }, []);

  const updateLines = useCallback((textRef) => {
    const calculatedLines = calculateLines(textRef);
    if (calculatedLines?.length) {
      setLines(calculatedLines);
      return calculatedLines;
    }
    return [];
  }, [calculateLines]);

  return { lines, updateLines };
};
