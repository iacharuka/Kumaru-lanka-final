# Migration Guide

This guide helps you migrate your existing Kumaru Lanka website to the new well-structured format.

## 📋 Migration Checklist

### Phase 1: Setup (15 minutes)
- [ ] Install dependencies: `npm install`
- [ ] Create `.env` from `.env.example`
- [ ] Review new structure in `docs/PROJECT_STRUCTURE.md`

### Phase 2: Move Files (30 minutes)
- [ ] Move `index.html` to `src/index.html`
- [ ] Move JavaScript files from `js/` to `src/js/`
- [ ] Move CSS files from `css/` to `src/css/`
- [ ] Move HTML components to `src/components/`
- [ ] Move page files to `src/pages/`
- [ ] Move assets to `src/assets/`

### Phase 3: Update Imports (45 minutes)
- [ ] Update all `import` statements to use new paths
- [ ] Use path aliases (`@`, `@components/`, `@services/`, etc.)
- [ ] Remove relative path traversals

### Phase 4: Refactor & Optimize (Variable)
- [ ] Extract common functions to `src/services/`
- [ ] Move API calls to `src/services/api.js`
- [ ] Create utility modules in `src/utils/`
- [ ] Add error handling and logging
- [ ] Remove unused code and dependencies

### Phase 5: Testing & Validation (15 minutes)
- [ ] Run `npm run dev` and test functionality
- [ ] Run `npm run lint` to check for issues
- [ ] Run `npm run format` to format code
- [ ] Test all pages and features
- [ ] Run `npm run build` for production build

## 🗂️ Step-by-Step File Migration

### 1. HTML Files

**Before:**
```
index.html
pages/
  ├── contact.html
  ├── destinations.html
  ├── tours.html
  └── vehicles.html
components/
  ├── navbar.html
  ├── footer.html
  └── tour-card.html
```

**After:**
```
src/
├── index.html
├── pages/
│   ├── contact.html
│   ├── destinations.html
│   ├── tours.html
│   └── vehicles.html
└── components/
    ├── layout/
    │   ├── navbar.html
    │   └── footer.html
    └── cards/
        └── tour-card.html
```

### 2. JavaScript Files

**Before:**
```javascript
// js/main.js
import { initNavbar } from './components.js';
```

**After:**
```javascript
// src/js/main.js
import { initNavbar } from '@/js/components.js';
// OR better practice:
import { initNavbar } from '@components/layout/navbar.js';
```

### 3. CSS Files

**Before:**
```css
/* css/main.css */
@import './components.css';
@import './pages.css';
```

**After:**
```css
/* src/css/main.css */
@import './variables.css';
@import './components/tour-card.css';
@import './pages/home.css';
```

### 4. Asset Files

**Before:**
```
assets/
└── images/
    ├── destination-1.jpg
    └── tour-banner.jpg
```

**After:**
```
src/assets/
├── images/
│   ├── destinations/
│   ├── tours/
│   └── ui/
├── icons/
├── fonts/
└── videos/
```

## 📝 Import Path Updates

### Converting Relative Paths

**Before:**
```javascript
import { validateForm } from '../utils/validators.js';
import { getTours } from '../services/api.js';
import tourCard from '../components/tour-card.html';
```

**After:**
```javascript
import { validateForm } from '@utils/validators.js';
import { getTours } from '@services/api.js';
import tourCard from '@components/cards/tour-card.html';
```

### Import Examples

```javascript
// ✅ Good - Using aliases
import { formatDate } from '@utils/helpers.js';
import { apiClient, toursAPI } from '@services/api.js';
import * as constants from '@utils/constants.js';

// ❌ Avoid - Relative paths
import { formatDate } from '../../utils/helpers.js';
import { apiClient } from '../../../services/api.js';
```

## 🔄 Refactoring Common Patterns

### API Calls

**Before:**
```javascript
// js/tours.js
fetch('/api/tours')
  .then(res => res.json())
  .then(data => console.log(data));
```

**After:**
```javascript
// src/js/pages/tours.js
import { toursAPI } from '@services/api.js';

toursAPI.getAll()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Component Initialization

**Before:**
```javascript
// js/components.js
function initModal() {
  const modal = document.querySelector('#modal');
  modal.addEventListener('click', () => { /* ... */ });
}
```

**After:**
```javascript
// src/js/components/Modal.js
class Modal {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    this.element.addEventListener('click', () => { /* ... */ });
  }
}

export default Modal;
```

### Utility Functions

**Before:**
```javascript
// js/utils.js (mixed with other code)
const formatDate = (date) => { /* ... */ };
const validateEmail = (email) => { /* ... */ };
const apiCall = (url) => { /* ... */ };
```

**After:**
```javascript
// src/utils/helpers.js
export const formatDate = (date) => { /* ... */ };

// src/utils/validators.js
export const validateEmail = (email) => { /* ... */ };

// src/services/api.js
export const apiClient = { /* ... */ };
```

## ⚡ Performance Optimizations

### Code Splitting

```javascript
// Lazy load heavy features
const TourFilters = () => import('@components/filters/TourFilters.js');

document.querySelector('#tour-filters')?.addEventListener('click', async () => {
  const { default: TourFilters } = await TourFilters();
  // Initialize filters
});
```

### Asset Optimization

```html
<!-- ✅ Good - Optimized images -->
<img src="/assets/images/destinations/kandy-sm.jpg" alt="Kandy">

<!-- ❌ Avoid - Large unoptimized images -->
<img src="/assets/destinations/kandy.jpg" alt="Kandy">
```

## 🐛 Common Migration Issues

### Issue: Imports Not Found

**Problem:**
```
Module not found: @/components/navbar
```

**Solution:**
Check `jsconfig.json` path aliases and file location. Verify casing matches (case-sensitive on Linux/Mac).

### Issue: CSS Not Applied

**Problem:**
CSS selectors not matching after reorganizing.

**Solution:**
1. Check HTML structure hasn't changed
2. Verify CSS class names match
3. Ensure CSS files are imported in correct order

### Issue: API Calls Failing

**Problem:**
API responses 404 or CORS errors.

**Solution:**
1. Verify `VITE_API_BASE_URL` in `.env`
2. Check API endpoints are correct in `src/services/api.js`
3. Ensure request headers are set properly

## 📊 Migration Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 15 min | Install deps, setup .env |
| Migration | 30 min | Move files to new structure |
| Imports | 45 min | Update all import statements |
| Refactoring | Variable | Extract services, utilities |
| Testing | 15 min | Test and validate |
| **Total** | **~2 hours** | Complete restructuring |

## ✅ Post-Migration Validation

After migration, verify:

```bash
# Check for linting errors
npm run lint

# Format all code
npm run format

# Run tests
npm run test

# Build for production
npm run build

# Check build output
npm run preview
```

All checks should pass with no errors.

## 🎯 Next Steps After Migration

1. **Set up CI/CD** - Add GitHub Actions for automated testing/building
2. **Add Environment Configs** - Create `.env.production`, `.env.staging`
3. **Implement Logging** - Add error tracking (Sentry, etc.)
4. **Add Monitoring** - Set up performance monitoring
5. **Document API** - Create API documentation for backend team
6. **Setup Deployment** - Deploy to hosting platform

## 📞 Need Help?

Refer to:
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Directory organization
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development best practices
- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Configuration guide
- Vite Docs: https://vitejs.dev/
- ESLint Docs: https://eslint.org/

---

**Pro Tip:** Do the migration incrementally. Migrate one feature at a time, test thoroughly, then move to the next. This prevents breaking everything at once!
