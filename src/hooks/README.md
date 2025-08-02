# Caret Component Hooks

This directory contains custom hooks that were extracted from the original `Caret.jsx` component to improve maintainability and scalability.

## Hooks Overview

### `useLineCalculation`
Handles text measurement and line detection logic.
- **Responsibility**: Calculate line boundaries and positions
- **Returns**: `{ lines, updateLines }`
- **Usage**: Used by the Caret component to determine where each line starts and ends

### `useCaretState`
Manages caret position and animation state.
- **Responsibility**: Track caret position, active state, and lifecycle
- **Returns**: `{ caret, active, resetCaret, updateCaret, stopAnimation }`
- **Usage**: Controls when the caret is visible and where it's positioned

### `useCaretAnimation`
Handles the smooth animation of the caret across text lines.
- **Responsibility**: Animate caret movement using requestAnimationFrame
- **Returns**: None (side effects only)
- **Usage**: Provides smooth caret movement at specified speed

### `useResizeHandler`
Manages window resize events for responsive behavior.
- **Responsibility**: Handle window resize and trigger line recalculation
- **Returns**: None (side effects only)
- **Usage**: Ensures caret positioning remains accurate when window size changes

## Benefits of This Refactoring

1. **Separation of Concerns**: Each hook has a single, well-defined responsibility
2. **Reusability**: Hooks can be used independently in other components
3. **Testability**: Each hook can be tested in isolation
4. **Maintainability**: Easier to modify specific functionality without affecting others
5. **Readability**: The main Caret component is now much cleaner and easier to understand

## Usage Example

```jsx
import { 
  useLineCalculation, 
  useCaretState, 
  useCaretAnimation, 
  useResizeHandler 
} from '../hooks';

const Caret = ({ text, isPlaying, speed }) => {
  const textRef = useRef(null);
  
  const { lines, updateLines } = useLineCalculation();
  const { caret, active, updateCaret, stopAnimation } = useCaretState(isPlaying, lines);
  
  useResizeHandler(() => updateLines(textRef));
  useCaretAnimation(active, lines, speed, caret, updateCaret, stopAnimation);
  
  // ... render logic
};
``` 