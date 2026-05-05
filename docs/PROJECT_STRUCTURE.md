# Project Structure Guide

## 📁 Directory Overview

```
kumaru-lanka/
├── src/                    # All source code
│   ├── index.html         # Main entry point
│   ├── js/                # JavaScript modules
│   │   ├── main.js        # Entry point
│   │   ├── core/          # Core functionality
│   │   ├── pages/         # Page-specific logic
│   │   ├── components/    # Component logic
│   │   └── services/      # External service integrations
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Global styles
│   │   ├── variables.css  # CSS variables
│   │   └── pages/         # Page-specific styles
│   ├── components/        # Reusable component templates
│   │   ├── layout/        # Layout components
│   │   ├── forms/         # Form components
│   │   ├── cards/         # Card components
│   │   └── ui/            # Generic UI components
│   ├── pages/             # Page templates
│   ├── services/          # Business logic & API calls
│   ├── utils/             # Utility functions
│   └── assets/            # Images, icons, fonts
│
├── config/                # Configuration files
├── tests/                 # Test files
├── docs/                  # Documentation
│
├── vite.config.js         # Vite build configuration
├── .eslintrc.js           # ESLint configuration
├── .prettierrc             # Prettier formatting config
├── jsconfig.json          # JavaScript path aliases
├── .env                   # Environment variables (local)
├── .env.example           # Environment variables (template)
└── package.json           # Dependencies & scripts
```

## 📂 What Goes Where?

### `src/js/`
- **main.js** - Application entry point
- **core/** - Core app initialization, routing, state management
- **pages/** - Logic specific to each page
- **components/** - Reusable component JavaScript
- **services/** - API calls, external integrations (weather, maps, etc.)

### `src/css/`
- **main.css** - Global styles, resets, typography
- **variables.css** - CSS custom properties (colors, spacing, fonts)
- **pages/** - Page-specific overrides

### `src/components/`
- **layout/** - Header, footer, sidebar templates
- **forms/** - Input, buttons, form wrappers
- **cards/** - Tour cards, vehicle cards, destination cards
- **ui/** - Modals, tooltips, dropdowns, tabs

### `src/services/`
- **api.js** - API client and endpoints
- **bookingService.js** - Booking logic
- **authService.js** - Authentication (if needed)
- **chatService.js** - AI chat integration

### `src/utils/`
- **validators.js** - Form validation, data validation
- **formatters.js** - Date, currency, text formatting
- **constants.js** - App constants, enums
- **helpers.js** - Common utility functions

## 🎯 Naming Conventions

### Files & Folders
- **kebab-case** for file names: `booking-modal.js`, `tour-card.css`
- **kebab-case** for folders: `src/components/ui-elements/`
- Keep names descriptive but concise

### Variables & Functions
- **camelCase** for variables & functions: `getUserData()`, `isFormValid`
- **UPPER_SNAKE_CASE** for constants: `API_BASE_URL`, `MAX_RETRIES`
- **PascalCase** for classes/components: `BookingModal`, `TourCard`

### CSS Classes
- **kebab-case**: `.tour-card`, `.modal-header`
- **BEM methodology**: `.tour-card__title`, `.tour-card--featured`
- **Prefix with component**: `.modal-close-btn` (not just `.close-btn`)

## 🚀 Build & Development

### Installation
```bash
npm install
```

### Development
```bash
npm run dev           # Start dev server (http://localhost:5173)
npm run lint          # Check code quality
npm run format        # Auto-format code
```

### Production
```bash
npm run build         # Build for production
npm run preview       # Preview production build
```

## 📋 Quick Checklist

- [ ] Move existing files to new `src/` structure
- [ ] Update import paths in JavaScript
- [ ] Run `npm install` to install dependencies
- [ ] Test with `npm run dev`
- [ ] Set up `.env` variables
- [ ] Run linting & formatting
- [ ] Update CI/CD pipelines if applicable
