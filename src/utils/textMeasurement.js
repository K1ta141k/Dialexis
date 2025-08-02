import { CARET_CONFIG } from '../constants';

export const createTextMeasurementContext = (computedStyles) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${computedStyles.fontSize} ${computedStyles.fontFamily}`;
  return ctx;
};

export const measureTextWidth = (text, ctx) => {
  return ctx.measureText(text).width;
};

export const createTemporaryElement = (text, computedStyles) => {
  const element = document.createElement('span');
  element.textContent = text;
  element.style.cssText = `
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
  return element;
};

export const measureElementWidth = (element) => {
  document.body.appendChild(element);
  const rect = element.getBoundingClientRect();
  document.body.removeChild(element);
  return rect.width;
};

export const getLineHeight = (computedStyles) => {
  return parseFloat(computedStyles.lineHeight) ||
         parseFloat(computedStyles.fontSize) * CARET_CONFIG.DEFAULT_LINE_HEIGHT_MULTIPLIER;
};
