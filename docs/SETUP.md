# Kumaru Lanka - Structured Project Setup

Welcome! This is a professionally structured tourism website for Kumaru Lanka.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📚 Documentation

- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Directory organization and conventions
- **[Development Guide](./docs/DEVELOPMENT.md)** - Best practices and workflows
- **[Environment Variables](./docs/ENV_VARIABLES.md)** - Configuration guide

## 📋 Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code quality
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check if code is formatted
npm run test          # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
```

## 🏗️ Project Structure

```
src/
├── index.html         # Main entry point
├── js/               # JavaScript modules
├── css/              # Stylesheets
├── components/       # Reusable templates
├── pages/            # Page templates
├── services/         # Business logic & API
├── utils/            # Helper functions
└── assets/           # Images, icons, fonts
```

See [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) for detailed breakdown.

## 🎨 Features

✅ **Modern Build System** - Vite for fast development & production builds
✅ **Code Quality** - ESLint for linting, Prettier for formatting
✅ **Testing** - Vitest for unit & integration tests
✅ **Environment Configuration** - Support for development/staging/production
✅ **Path Aliases** - Import with `@/`, `@components/`, `@services/` etc.
✅ **Modular Architecture** - Organized by feature with clear separation of concerns
✅ **Documentation** - Comprehensive guides and best practices

## 🔧 Configuration Files

- `vite.config.js` - Build tool configuration
- `.eslintrc.js` - Linting rules
- `.prettierrc` - Code formatting rules
- `jsconfig.json` - Path aliases and JS configuration
- `.env` - Environment variables

## 📦 Next Steps

1. **Move existing files** to the new `src/` directory structure
2. **Update import paths** in JavaScript files
3. **Configure environment variables** in `.env`
4. **Install dependencies** with `npm install`
5. **Start development** with `npm run dev`
6. **Run linting** to ensure code quality: `npm run lint:fix`

## 🤝 Contributing

- Follow the [Development Guide](./docs/DEVELOPMENT.md)
- Use `npm run format` before committing
- Ensure tests pass: `npm run test`
- Check code quality: `npm run lint`

## 📞 Support

For questions or issues with the project structure, refer to the documentation in the `docs/` folder.

---

**Version:** 1.0.0  
**Last Updated:** 2024
