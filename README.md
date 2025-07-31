# Dialexis React App

A modern React application for reading speed testing with a clean, organized codebase and Tailwind CSS styling.

## Features

- ⚛️ React 18 with modern hooks
- 🎨 Tailwind CSS for utility-first styling
- 📱 Responsive design
- 🚀 Fast development with hot reload
- 📦 Optimized production builds
- 🎯 Reading speed test with animated caret
- ⏱️ Functional timer with play/pause/restart controls
- 🎨 Consistent theming with CSS custom properties
- 📝 Centralized constants for maintainability
- 🔍 ESLint for code quality and consistency

## Project Structure

```
dialexis/
├── public/              # Static files
│   ├── index.html       # Main HTML file
│   ├── manifest.json    # Web app manifest
│   └── robots.txt       # SEO robots file
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── Background.jsx # Background wrapper component
│   │   ├── BackgroundPattern.jsx # Background pattern overlay
│   │   ├── ContentWrapper.jsx # Content wrapper component
│   │   ├── Header.jsx   # Header component
│   │   ├── Logo.jsx     # Logo component
│   │   ├── Footer.jsx   # Footer component
│   │   ├── MainContent.jsx # Main content wrapper
│   │   ├── ReadingSpeedTest.jsx # Main reading speed test
│   │   ├── ReadingTestTitle.jsx # Test title component
│   │   ├── ReadingContent.jsx # Reading text with caret
│   │   ├── Caret.jsx    # Animated reading caret
│   │   ├── Timer.jsx    # Timer with controls
│   │   ├── TimerDisplay.jsx # Timer display component
│   │   ├── TimerControls.jsx # Play/pause/restart controls
│   │   ├── ResultsRow.jsx # Results section
│   │   └── ViewResultsButton.jsx # Results button
│   ├── styles/          # Component-specific styles
│   │   └── components/  # CSS files for components
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── constants.js     # Centralized application constants
│   ├── App.jsx          # Main App component
│   ├── index.js         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── .eslintrc.js         # ESLint configuration
```

## Key Improvements

### Code Organization
- **Centralized Constants**: All hardcoded values moved to `src/constants.js`
- **CSS Custom Properties**: Consistent theming with CSS variables
- **Component Modularity**: Each component has a single responsibility
- **Clean Imports**: Organized import statements
- **ESLint Configuration**: Comprehensive linting rules for code quality

### Functionality
- **Working Timer**: Actual timer functionality with play/pause/restart
- **Animated Caret**: Smooth reading caret animation
- **Consistent Styling**: Unified color scheme and spacing
- **Responsive Design**: Works across different screen sizes

### Maintainability
- **No Redundancy**: Eliminated duplicate CSS properties
- **Consistent Naming**: Standardized class and variable names
- **Clear Structure**: Logical file organization
- **Documentation**: Updated README with current structure
- **Code Quality**: ESLint enforces consistent code style and best practices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Automatically fix linting issues
- `npm run lint:check` - Check for linting issues and fail if warnings found

## ESLint Configuration

This project uses ESLint to maintain code quality and consistency across the React application.

### Configuration

The ESLint configuration is defined in `.eslintrc.js` and includes:

#### Extends
- `eslint:recommended` - Basic ESLint rules
- `plugin:react/recommended` - React-specific rules
- `plugin:react-hooks/recommended` - React Hooks rules
- `plugin:jsx-a11y/recommended` - Accessibility rules

#### Plugins
- `react` - React-specific linting
- `react-hooks` - React Hooks linting
- `jsx-a11y` - Accessibility linting

#### Key Rules

**React Rules**
- `react/react-in-jsx-scope: off` - Not needed in React 17+
- `react/prop-types: off` - Not using PropTypes
- `react/jsx-uses-react: off` - Not needed in React 17+
- `react/jsx-key: error` - Require key prop for list items
- `react/no-array-index-key: warn` - Warn against using array index as key

**React Hooks Rules**
- `react-hooks/rules-of-hooks: error` - Enforce Rules of Hooks
- `react-hooks/exhaustive-deps: warn` - Check effect dependencies

**Code Style Rules**
- `indent: ['error', 2]` - 2-space indentation
- `quotes: ['error', 'single']` - Single quotes for strings
- `semi: ['error', 'always']` - Always use semicolons
- `comma-dangle: ['error', 'always-multiline']` - Trailing commas in multiline
- `no-trailing-spaces: error` - No trailing whitespace
- `eol-last: error` - Newline at end of file

**JavaScript Rules**
- `no-unused-vars: warn` - Warn about unused variables
- `no-console: warn` - Warn about console statements
- `prefer-const: error` - Use const when variables aren't reassigned
- `no-var: error` - Use let/const instead of var
- `object-shorthand: error` - Use object shorthand
- `prefer-template: error` - Use template literals

**Accessibility Rules**
- `jsx-a11y/alt-text: error` - Require alt text for images
- `jsx-a11y/anchor-has-content: error` - Anchors must have content
- `jsx-a11y/anchor-is-valid: error` - Validate anchor href
- `jsx-a11y/aria-props: error` - Validate ARIA properties
- `jsx-a11y/click-events-have-key-events: error` - Click handlers need keyboard support
- `jsx-a11y/no-static-element-interactions: error` - Use semantic elements for interactions

### Usage

#### Development
Run `npm run lint` to check for issues during development.

#### Pre-commit
Consider adding a pre-commit hook to run `npm run lint:check` before commits.

#### CI/CD
Add `npm run lint:check` to your CI pipeline to ensure code quality.

### Best Practices

1. **Fix Issues Early**: Run `npm run lint:fix` regularly to maintain clean code
2. **Accessibility**: Pay attention to jsx-a11y warnings for better accessibility
3. **React Hooks**: Ensure proper dependency arrays in useEffect
4. **Code Style**: Follow the established formatting rules consistently
5. **Performance**: Address any performance-related warnings

### Common Issues and Solutions

#### Unused Variables
- Remove unused imports and variables
- Use underscore prefix for intentionally unused variables: `_unusedVar`

#### Console Statements
- Remove console.log statements before production
- Use proper logging library for production debugging

#### Accessibility Issues
- Add proper ARIA labels to interactive elements
- Use semantic HTML elements
- Ensure keyboard navigation works

#### React Hooks Dependencies
- Include all dependencies in useEffect dependency arrays
- Use useCallback/useMemo when appropriate
- Avoid infinite re-render loops

### Integration with IDEs

#### VS Code
Install the ESLint extension for real-time linting feedback.

#### WebStorm
ESLint is automatically detected and integrated.

#### Other Editors
Most modern editors support ESLint through extensions or built-in features.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint:check` to ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License. 