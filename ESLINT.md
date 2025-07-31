# ESLint Configuration

This project uses ESLint to maintain code quality and consistency across the React application.

## Configuration

The ESLint configuration is defined in `.eslintrc.js` and includes:

### Extends
- `eslint:recommended` - Basic ESLint rules
- `plugin:react/recommended` - React-specific rules
- `plugin:react-hooks/recommended` - React Hooks rules
- `plugin:jsx-a11y/recommended` - Accessibility rules

### Plugins
- `react` - React-specific linting
- `react-hooks` - React Hooks linting
- `jsx-a11y` - Accessibility linting

### Key Rules

#### React Rules
- `react/react-in-jsx-scope: off` - Not needed in React 17+
- `react/prop-types: off` - Not using PropTypes
- `react/jsx-uses-react: off` - Not needed in React 17+
- `react/jsx-key: error` - Require key prop for list items
- `react/no-array-index-key: warn` - Warn against using array index as key

#### React Hooks Rules
- `react-hooks/rules-of-hooks: error` - Enforce Rules of Hooks
- `react-hooks/exhaustive-deps: warn` - Check effect dependencies

#### Code Style Rules
- `indent: ['error', 2]` - 2-space indentation
- `quotes: ['error', 'single']` - Single quotes for strings
- `semi: ['error', 'always']` - Always use semicolons
- `comma-dangle: ['error', 'always-multiline']` - Trailing commas in multiline
- `no-trailing-spaces: error` - No trailing whitespace
- `eol-last: error` - Newline at end of file

#### JavaScript Rules
- `no-unused-vars: warn` - Warn about unused variables
- `no-console: warn` - Warn about console statements
- `prefer-const: error` - Use const when variables aren't reassigned
- `no-var: error` - Use let/const instead of var
- `object-shorthand: error` - Use object shorthand
- `prefer-template: error` - Use template literals

#### Accessibility Rules
- `jsx-a11y/alt-text: error` - Require alt text for images
- `jsx-a11y/anchor-has-content: error` - Anchors must have content
- `jsx-a11y/anchor-is-valid: error` - Validate anchor href
- `jsx-a11y/aria-props: error` - Validate ARIA properties
- `jsx-a11y/click-events-have-key-events: error` - Click handlers need keyboard support
- `jsx-a11y/no-static-element-interactions: error` - Use semantic elements for interactions

## Available Scripts

### `npm run lint`
Check for linting issues in the source code.

### `npm run lint:fix`
Automatically fix linting issues that can be resolved.

### `npm run lint:check`
Check for linting issues and fail if any warnings are found (useful for CI/CD).

## Usage

### Development
Run `npm run lint` to check for issues during development.

### Pre-commit
Consider adding a pre-commit hook to run `npm run lint:check` before commits.

### CI/CD
Add `npm run lint:check` to your CI pipeline to ensure code quality.

## Ignored Files

The following patterns are ignored:
- `node_modules/`
- `build/`
- `dist/`
- `*.config.js`
- `*.config.mjs`

## Best Practices

1. **Fix Issues Early**: Run `npm run lint:fix` regularly to maintain clean code
2. **Accessibility**: Pay attention to jsx-a11y warnings for better accessibility
3. **React Hooks**: Ensure proper dependency arrays in useEffect
4. **Code Style**: Follow the established formatting rules consistently
5. **Performance**: Address any performance-related warnings

## Common Issues and Solutions

### Unused Variables
- Remove unused imports and variables
- Use underscore prefix for intentionally unused variables: `_unusedVar`

### Console Statements
- Remove console.log statements before production
- Use proper logging library for production debugging

### Accessibility Issues
- Add proper ARIA labels to interactive elements
- Use semantic HTML elements
- Ensure keyboard navigation works

### React Hooks Dependencies
- Include all dependencies in useEffect dependency arrays
- Use useCallback/useMemo when appropriate
- Avoid infinite re-render loops

## Integration with IDEs

### VS Code
Install the ESLint extension for real-time linting feedback.

### WebStorm
ESLint is automatically detected and integrated.

### Other Editors
Most modern editors support ESLint through extensions or built-in features. 