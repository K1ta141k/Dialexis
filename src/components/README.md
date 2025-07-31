# Components Folder

This folder contains all React components for the Dialexis reading speed test application.

## Current Structure

All components are currently in the root of the components folder. Each component is self-contained with its own CSS file and follows consistent naming conventions.

## Component Guidelines

1. **Naming**: Use PascalCase for component files
2. **Structure**: One component per file
3. **Styling**: Use component-specific CSS files in `src/styles/components/`
4. **Props**: Use default parameters for optional props
5. **Constants**: Import from `src/constants.js` for text content and configuration

## Available Components

### Layout Components
- `Background.jsx` - Dynamic background component with pattern overlay
- `BackgroundPattern.jsx` - Background pattern overlay component
- `ContentWrapper.jsx` - Content wrapper component
- `Header.jsx` - Header component containing the logo
- `Footer.jsx` - Footer component for the application
- `MainContent.jsx` - Main content wrapper component

### UI Components
- `Logo.jsx` - Logo component displaying the "Δialexis" brand text
- `Timer.jsx` - Timer component with play/restart functionality
- `TimerDisplay.jsx` - Timer display component
- `TimerControls.jsx` - Timer controls component with play/restart icons
- `ViewResultsButton.jsx` - Reusable button component for viewing results

### Feature Components
- `ReadingSpeedTest.jsx` - Main reading speed test component
- `ReadingTestTitle.jsx` - Title component for the reading test
- `ReadingContent.jsx` - Reading text content component with caret
- `Caret.jsx` - Animated reading caret component
- `ResultsRow.jsx` - Results row with icon and button

## Component Dependencies

```
App.jsx
├── Background.jsx
│   ├── BackgroundPattern.jsx
│   └── ContentWrapper.jsx
├── Header.jsx
│   └── Logo.jsx
├── MainContent.jsx
│   └── ReadingSpeedTest.jsx
│       ├── ReadingTestTitle.jsx
│       ├── Timer.jsx
│       │   ├── TimerDisplay.jsx
│       │   └── TimerControls.jsx
│       ├── ReadingContent.jsx
│       │   └── Caret.jsx
│       └── ResultsRow.jsx
│           └── ViewResultsButton.jsx
└── Footer.jsx
```

## Styling

Each component has a corresponding CSS file in `src/styles/components/` that follows the naming convention `ComponentName.css`. These files contain component-specific styles and use CSS custom properties for consistent theming.

## Constants

Components use centralized constants from `src/constants.js`:
- `APP_CONFIG` - Application configuration (caret speed, text, etc.)
- `TIMER_CONFIG` - Timer-related settings
- `COMPONENT_NAMES` - Text content for components

## Best Practices

1. **Single Responsibility**: Each component has a single, well-defined purpose
2. **Reusability**: Components are designed to be reusable where possible
3. **Props Interface**: Use clear, descriptive prop names with default values
4. **CSS Organization**: Keep styles scoped to the component
5. **Accessibility**: Follow accessibility best practices with proper ARIA labels
6. **Performance**: Use React.memo for components that don't need frequent re-renders 