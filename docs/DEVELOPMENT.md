# Development Workflow Guide

## ✅ Best Practices

### 1. **Module Organization**
- Import statements at the top
- Related functionality grouped together
- One responsibility per file

### 2. **Component Structure**
```javascript
// Good structure for a component JS file
import { validateForm } from '@utils/validators.js';
import { submitBooking } from '@services/bookingService.js';

class BookingModal {
  constructor() {
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    // Event listeners
  }
  
  render() {
    // DOM rendering logic
  }
}

export default new BookingModal();
```

### 3. **Service Layer**
```javascript
// services/api.js - Centralize all API calls
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

export const getTours = () => apiClient.get('/tours');
export const getDestinations = () => apiClient.get('/destinations');
```

### 4. **CSS Architecture**
```css
/* Use CSS variables for consistency */
:root {
  --primary: #e07b39;
  --primary-dark: #c96a2a;
  --spacing-unit: 8px;
  --font-main: 'Font Name', sans-serif;
}

/* Use BEM for component styles */
.tour-card {
  padding: calc(var(--spacing-unit) * 2);
}

.tour-card__header {
  font-weight: bold;
}

.tour-card--featured {
  border: 2px solid var(--primary);
}
```

### 5. **Error Handling**
```javascript
try {
  const tours = await getTours();
  render(tours);
} catch (error) {
  console.error('Failed to load tours:', error);
  showErrorMessage('Unable to load tours. Please try again.');
}
```

## 📝 Code Review Checklist

Before committing:
- [ ] Run `npm run lint:fix` to fix linting issues
- [ ] Run `npm run format` to format code
- [ ] Test in browser at http://localhost:5173
- [ ] No console errors or warnings
- [ ] Mobile responsive (test on different screens)
- [ ] Performance acceptable (check Network tab)

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-booking-system

# Make changes, commit regularly
git add .
git commit -m "feat: add new booking modal component"

# Before pushing, ensure code quality
npm run lint:fix
npm run format
npm run test

# Push and create PR
git push origin feature/new-booking-system
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

Test example:
```javascript
// tests/booking.test.js
import { describe, it, expect } from 'vitest';
import { validateBooking } from '@services/bookingService.js';

describe('Booking Service', () => {
  it('should validate correct booking data', () => {
    const valid = validateBooking({
      name: 'John Doe',
      email: 'john@example.com',
      date: '2024-01-01'
    });
    expect(valid).toBe(true);
  });
});
```

## 🐛 Debugging Tips

1. **Use browser DevTools** - F12 or Cmd+Option+I
2. **Network tab** - Check API calls and responses
3. **Console** - Look for errors and warnings
4. **Performance tab** - Identify slow operations
5. **React DevTools / Vue DevTools** - (if using frameworks)

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [MDN Web Docs](https://developer.mozilla.org/)
