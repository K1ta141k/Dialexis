// Application Constants
export const APP_CONFIG = {
  DEFAULT_CARET_SPEED: 200, // milliseconds per character
  DEFAULT_CARET_WIDTH: 3,
  DEFAULT_CARET_HEIGHT: 30,
  DEFAULT_TEXT: 'The rise of renewable energy has transformed global power systems. Solar and wind energy are now the fastest-growing energy sources, helping reduce carbon emissions. Governments worldwide are investing heavily in sustainable solutions to combat climate change. The future of energy depends on innovation, policy changes, and public support for clean power technologies.',
  DEFAULT_CODE: `function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// Optimized version using memoization
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Example usage
const result = fibonacciMemo(10);
console.log("Fibonacci of 10:", result);`,
};

// Timer Constants
export const TIMER_CONFIG = {
  UPDATE_INTERVAL: 1000, // milliseconds
  TIME_FORMAT: 'MM:SS',
};

// Component Names
export const COMPONENT_NAMES = {
  APP: 'LexiDrom App',
  LOGO: 'LexiDrom',
  READING_TEST_TITLE: 'Reading Speed Test',
  CODE_TEST_TITLE: 'Code Traversal Speed Test',
  TIME_LABEL: 'Time: ',
  READING_SPEED_LABEL: 'Reading Speed',
  WPM_SUFFIX: ' WPM',
  FOOTER_TEXT: '© 2025 LexiDrom. Reading speed test application.',
  SPEED_SLIDER_ARIA_LABEL: 'Adjust reading speed',
  READING_OVERLAY_MESSAGE: 'Click play to start reading',
  SUMMARY_PLACEHOLDER: 'Produce a detailed summary of the excerpt you read...',
  SUBMIT_BUTTON: 'Submit',
};

// Slider Constants
export const SLIDER_CONFIG = {
  DEFAULT_VALUE: 200,
  MIN_VALUE: 50,
  MAX_VALUE: 500,
  STEP_VALUE: 10,
  AVG_CHAR_WIDTH: 9, // pixels per character
  AVG_WORD_LENGTH: 5, // characters per word
  SECONDS_PER_MINUTE: 60,
};

// Caret Constants
export const CARET_CONFIG = {
  DEFAULT_SPEED: 120, // pixels per second
  DEFAULT_COLOR: '#1f2937',
  DEFAULT_WIDTH: 2,
  DEFAULT_LINE_HEIGHT_MULTIPLIER: 1.6,
};
