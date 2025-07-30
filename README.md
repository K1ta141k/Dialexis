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
└── postcss.config.js    # PostCSS configuration
```

## Key Improvements

### Code Organization
- **Centralized Constants**: All hardcoded values moved to `src/constants.js`
- **CSS Custom Properties**: Consistent theming with CSS variables
- **Component Modularity**: Each component has a single responsibility
- **Clean Imports**: Organized import statements

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
- `npm run eject` - Ejects from Create React App (one-way operation)

## Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

### Customization

You can customize Tailwind by modifying:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles and Tailwind imports
- `src/styles/components/App.css` - CSS custom properties for theming

### Utility Classes

Tailwind provides utility classes for:
- Layout (flexbox, grid, positioning)
- Spacing (padding, margin)
- Typography (font size, weight, color)
- Colors (background, text, border)
- Effects (shadows, opacity, transforms)

## Component Development

Components are located in `src/components/`. Each component:
- Is self-contained with its own CSS file
- Uses CSS custom properties for consistent theming
- Accepts props for customization
- Is reusable across the application
- Follows consistent naming conventions

## Constants Management

Application constants are centralized in `src/constants.js`:
- `APP_CONFIG` - Default values for caret speed, text, etc.
- `TIMER_CONFIG` - Timer-related settings
- `COMPONENT_NAMES` - Text content for components

## Deployment

The app can be deployed to any static hosting service:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service.

## Contributing

1. Create feature branches
2. Follow the existing code style
3. Use CSS custom properties for theming
4. Update constants in `src/constants.js` for new values
5. Test your changes

## License

This project is open source and available under the [MIT License](LICENSE). 