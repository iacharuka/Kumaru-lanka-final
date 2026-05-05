# ✅ Project Setup Checklist & Quick Reference

## 🎯 What's Been Set Up

### ✅ Directory Structure (11 folders + root files)
- [x] `src/` - All source code
- [x] `src/js/` - JavaScript modules
- [x] `src/css/` - Stylesheets
- [x] `src/components/` - Reusable components
- [x] `src/pages/` - Page templates
- [x] `src/services/` - Business logic & API
- [x] `src/utils/` - Utility functions
- [x] `src/assets/` - Images, icons, fonts
- [x] `config/` - Configuration folder
- [x] `tests/` - Test files
- [x] `docs/` - Documentation

### ✅ Configuration Files (11 files)
- [x] `vite.config.js` - Build tool config
- [x] `vitest.config.js` - Testing config
- [x] `jsconfig.json` - Path aliases
- [x] `.eslintrc.js` - Linting rules
- [x] `.prettierrc` - Code formatting
- [x] `.gitignore` - Git ignore rules
- [x] `.env` - Environment variables
- [x] `.env.example` - Environment template
- [x] `.prettierignore` - Prettier ignore
- [x] `package.json` - Dependencies (UPDATED)

### ✅ Pre-made Code Files (7 files)
- [x] `src/services/api.js` - API client with endpoints
- [x] `src/utils/helpers.js` - 10+ utility functions
- [x] `src/utils/validators.js` - Form validation
- [x] `src/utils/constants.js` - App constants
- [x] `src/js/ComponentTemplate.js` - Component base class
- [x] `tests/example.test.js` - Test examples

### ✅ Documentation Files (6 files)
- [x] `docs/SETUP.md` - Quick start guide
- [x] `docs/PROJECT_STRUCTURE.md` - Directory details
- [x] `docs/DEVELOPMENT.md` - Best practices
- [x] `docs/ENV_VARIABLES.md` - Configuration guide
- [x] `docs/MIGRATION_GUIDE.md` - Migration steps
- [x] `docs/STRUCTURE_SUMMARY.md` - Overview
- [x] `docs/QUICK_REFERENCE.md` - This file!

---

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd kumaru-lanka
npm install
```
⏱️ **Time:** ~2-3 minutes (depending on internet speed)

### 2. Create Environment File
```bash
cp .env.example .env
```
Edit `.env` and update:
- `VITE_API_BASE_URL` - Your API endpoint
- `VITE_WHATSAPP_NUMBER` - Your WhatsApp contact

### 3. Start Development Server
```bash
npm run dev
```
Open: http://localhost:5173

✅ **Done!** Your development server is running.

---

## 📝 Essential Commands

### Development
```bash
npm run dev              # 🚀 Start development server
npm run build            # 📦 Build for production
npm run preview          # 👀 Preview production build
```

### Code Quality
```bash
npm run lint             # 🔍 Check for issues
npm run lint:fix         # ✨ Auto-fix issues
npm run format           # 📝 Format code
npm run format:check     # ✓ Check formatting
```

### Testing
```bash
npm run test             # 🧪 Run tests
npm run test:ui          # 🖥️ Tests with UI
npm run test:coverage    # 📊 Coverage report
```

---

## 📂 File Organization Guide

### Where to Put What?

| Type | Location | Example |
|------|----------|---------|
| **HTML Templates** | `src/components/` | Navbar, Footer, Cards |
| **Page Content** | `src/pages/` | tours.html, contact.html |
| **JavaScript Logic** | `src/js/` | main.js, tours.js |
| **CSS Styles** | `src/css/` | main.css, tour-card.css |
| **API Calls** | `src/services/api.js` | getTours(), getDestinations() |
| **Helper Functions** | `src/utils/helpers.js` | formatDate(), debounce() |
| **Validation** | `src/utils/validators.js` | validateEmail(), validateForm() |
| **Constants** | `src/utils/constants.js` | TOUR_TYPES, CURRENCY |
| **Images/Icons** | `src/assets/` | images/, icons/, fonts/ |
| **Tests** | `tests/` | example.test.js |

---

## 🔗 Import Examples

### ✅ **Good** - Using Path Aliases
```javascript
import { formatDate } from '@utils/helpers.js';
import { validateEmail } from '@utils/validators.js';
import { toursAPI } from '@services/api.js';
import ComponentTemplate from '@/js/ComponentTemplate.js';
```

### ❌ **Avoid** - Relative Paths
```javascript
import { formatDate } from '../../../utils/helpers.js';
import { toursAPI } from '../../services/api.js';
```

---

## 📚 Documentation Map

```
docs/
├── SETUP.md                    👈 Start here for quick setup
├── PROJECT_STRUCTURE.md        📁 Detailed folder guide
├── DEVELOPMENT.md              💻 Best practices & workflows
├── ENV_VARIABLES.md            ⚙️ Configuration guide
├── MIGRATION_GUIDE.md          🔄 Step-by-step migration
├── STRUCTURE_SUMMARY.md        📊 Complete overview
└── QUICK_REFERENCE.md          ⚡ This file!
```

---

## 🎯 Common Tasks

### Create a New Component

**File:** `src/js/components/MyComponent.js`
```javascript
import ComponentTemplate from '../ComponentTemplate.js';

class MyComponent extends ComponentTemplate {
  getHTML() {
    return `
      <div class="my-component">
        <!-- Your HTML here -->
      </div>
    `;
  }
}

export default MyComponent;
```

### Add an API Endpoint

**File:** `src/services/api.js` (already set up!)
```javascript
export const myNewAPI = {
  getAll: () => apiClient.get('/my-endpoint'),
  getById: (id) => apiClient.get(`/my-endpoint/${id}`),
  create: (data) => apiClient.post('/my-endpoint', data),
};
```

### Create a Utility Function

**File:** `src/utils/helpers.js` (already set up!)
```javascript
export const myNewHelper = (param) => {
  // Your logic here
};
```

### Write a Test

**File:** `tests/myTest.test.js`
```javascript
import { describe, it, expect } from 'vitest';

describe('My Feature', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

---

## 🔑 Key Environment Variables

Edit `.env` to configure:

```env
# API
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000

# Features
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_BOOKING=true

# Contact
VITE_WHATSAPP_NUMBER=+94XXXXXXXXX

# Environment
VITE_ENVIRONMENT=development
```

Access in your code:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isChatEnabled = import.meta.env.VITE_ENABLE_AI_CHAT;
```

---

## 🎨 CSS Best Practices

### File Structure
```
src/css/
├── main.css              # Global styles
├── variables.css         # CSS variables
├── components/           # Component styles
│   └── tour-card.css
└── pages/                # Page-specific
    └── tours.css
```

### Use CSS Variables
```css
:root {
  --primary: #e07b39;
  --spacing: 8px;
  --font-main: 'Font', sans-serif;
}

.button {
  background: var(--primary);
  padding: calc(var(--spacing) * 2);
  font-family: var(--font-main);
}
```

### BEM Naming
```css
.tour-card { }
.tour-card__title { }
.tour-card__price { }
.tour-card--featured { }
```

---

## 🐛 Troubleshooting

### Issue: Module not found
```
Error: Module not found: @/utils/helpers
```
**Solution:** Check the import path and file location. Use lowercase and correct spelling.

### Issue: CSS not loading
**Solution:** Ensure CSS file is imported in the right order. Check path in `src/css/main.css`.

### Issue: API calls failing
**Solution:** 
1. Check `.env` has correct `VITE_API_BASE_URL`
2. Verify API endpoint exists in `src/services/api.js`
3. Check browser console for CORS errors

### Issue: Tests not running
**Solution:** Run `npm run test` and check error messages. Ensure test files end with `.test.js`.

---

## ✨ Tools Included

| Tool | Purpose | Command |
|------|---------|---------|
| **Vite** | Build & dev server | `npm run dev` |
| **ESLint** | Code quality | `npm run lint` |
| **Prettier** | Code formatting | `npm run format` |
| **Vitest** | Unit testing | `npm run test` |
| **Axios** | HTTP requests | `import axios` |

---

## 📊 Build Output

After `npm run build`, you get:

```
dist/
├── index.html           # Minified
├── assets/              # Optimized images, fonts
└── js/
    └── main-xxxxx.js    # Bundled & minified
```

This `dist/` folder is production-ready! Deploy it to your hosting.

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Upload to Hosting
```bash
# Upload the dist/ folder to your hosting
# Example with rsync:
rsync -av dist/ user@server:/var/www/kumaru-lanka/
```

### Environment for Production
Create `.env.production`:
```env
VITE_API_BASE_URL=https://api.kumaru-lanka.com
VITE_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

---

## 📋 Pre-Migration Checklist

Before migrating existing code:

- [ ] Read [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- [ ] Backup your current code
- [ ] Install dependencies (`npm install`)
- [ ] Test the new setup locally
- [ ] Plan file movements
- [ ] Start migrating one section at a time
- [ ] Test thoroughly after each migration

---

## 🎓 Learning Path

1. **Start Here:** Read [SETUP.md](./SETUP.md)
2. **Understand Structure:** Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. **Learn Best Practices:** Read [DEVELOPMENT.md](./DEVELOPMENT.md)
4. **Migrate Code:** Follow [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
5. **Configure Environment:** Check [ENV_VARIABLES.md](./ENV_VARIABLES.md)

---

## 🔗 Useful Links

- **Vite Documentation:** https://vitejs.dev/
- **ESLint Rules:** https://eslint.org/docs/rules/
- **Vitest Documentation:** https://vitest.dev/
- **Axios Documentation:** https://axios-http.com/
- **MDN Web Docs:** https://developer.mozilla.org/

---

## 💡 Pro Tips

1. **Use Aliases** - No more `../../../` paths!
2. **Keep Services Separate** - All API calls in one place
3. **Write Tests** - Catch bugs early!
4. **Format Before Commit** - `npm run format` always
5. **Check Linting** - `npm run lint` catches issues
6. **Use Constants** - Centralize your values
7. **Document Code** - Add JSDoc comments
8. **Version Your Env** - Keep `.env.example` updated

---

## ✅ Success Checklist

After setup, you should have:

- [x] ✨ Modern build system (Vite)
- [x] 🔍 Code quality tools (ESLint, Prettier)
- [x] 🧪 Testing framework (Vitest)
- [x] 📁 Organized file structure
- [x] 🔗 Path aliases for clean imports
- [x] ⚙️ Environment configuration
- [x] 📚 Comprehensive documentation
- [x] 🚀 Production-ready setup

---

## 🎯 Next Actions

Choose one:

1. **[Migrate Existing Code](./MIGRATION_GUIDE.md)** - Follow step-by-step guide
2. **[Start Fresh Code](./DEVELOPMENT.md)** - Use new structure for new features
3. **[Learn Best Practices](./DEVELOPMENT.md)** - Read development guidelines

---

**Last Updated:** May 5, 2024  
**Project:** Kumaru Lanka  
**Version:** 1.0.0 (Restructured)

---

## 📞 Need Help?

- 📖 Check the [docs/](.) folder for detailed guides
- 🔍 Use `npm run lint` to find issues
- 🧪 Use `npm run test` to validate code
- 💻 Check browser console for errors

**You're all set! Happy coding! 🚀**
