# Components Folder

This folder contains all your React components. Organize them by feature or functionality.

## Structure

```
components/
├── common/          # Reusable components (Button, Card, Modal, etc.)
├── layout/          # Layout components (Header, Footer, Sidebar, etc.)
├── forms/           # Form-related components
├── ui/              # UI-specific components
└── feature/         # Feature-specific components
```

## Component Guidelines

1. **Naming**: Use PascalCase for component files and folders
2. **Structure**: One component per file
3. **Props**: Use PropTypes or TypeScript for type checking
4. **Styling**: Use Tailwind CSS classes for styling

## Example Component

```javascript
import React from 'react';

const MyComponent = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;
```

## Available Components

### Layout Components
- `Background.jsx` - Dynamic background component with hooks and animations
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
- `ReadingContent.jsx` - Reading text content component
- `ResultsRow.jsx` - Results row with icon and button 