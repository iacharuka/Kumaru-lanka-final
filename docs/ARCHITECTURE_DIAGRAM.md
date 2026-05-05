/**
 * KUMARU LANKA - PROJECT STRUCTURE VISUAL REFERENCE
 * 
 * This shows the complete project architecture and how different parts connect
 */

┌─────────────────────────────────────────────────────────────────────────────┐
│                    KUMARU LANKA - WELL-STRUCTURED PROJECT                   │
│                                                                               │
│  ✨ Built with Vite | Tested with Vitest | Formatted with Prettier          │
│  🚀 Production-Ready | 📚 Well-Documented | 🎯 Modular Architecture          │
└─────────────────────────────────────────────────────────────────────────────┘


PROJECT HIERARCHY
═══════════════════════════════════════════════════════════════════════════════

kumaru-lanka/
│
├── 📁 src/                          ← All source code lives here
│   │
│   ├── 📄 index.html               ← Main entry point
│   │
│   ├── 📁 js/                       ← JavaScript logic
│   │   ├── main.js                 ← App initialization
│   │   ├── core/                   ← Core functionality
│   │   ├── pages/                  ← Page-specific logic
│   │   ├── components/             ← Component logic
│   │   └── ComponentTemplate.js    ← Reusable class
│   │
│   ├── 📁 css/                      ← Stylesheets
│   │   ├── main.css                ← Global styles
│   │   ├── variables.css           ← CSS variables
│   │   ├── components/             ← Component styles
│   │   └── pages/                  ← Page-specific styles
│   │
│   ├── 📁 components/               ← HTML templates
│   │   ├── layout/                 ← Header, footer, sidebar
│   │   ├── forms/                  ← Input, buttons, forms
│   │   ├── cards/                  ← Tour, destination, vehicle cards
│   │   └── ui/                     ← Modals, tooltips, dropdowns
│   │
│   ├── 📁 pages/                    ← Page HTML
│   │   ├── home.html
│   │   ├── tours.html
│   │   ├── destinations.html
│   │   └── contact.html
│   │
│   ├── 📁 services/                 ← Business logic & API
│   │   └── api.js ⭐               ← All API calls centralized
│   │       ├── toursAPI.getAll()
│   │       ├── destinationsAPI.getAll()
│   │       ├── bookingsAPI.create()
│   │       └── vehiclesAPI.getByType()
│   │
│   ├── 📁 utils/                    ← Utility modules
│   │   ├── helpers.js ⭐           ← Common functions
│   │   ├── validators.js ⭐        ← Form validation
│   │   ├── constants.js ⭐         ← App constants
│   │   └── formatters.js           ← Data formatting
│   │
│   └── 📁 assets/                   ← Static files
│       ├── images/
│       │   ├── destinations/
│       │   ├── tours/
│       │   └── ui/
│       ├── icons/
│       ├── fonts/
│       └── videos/
│
├── 📁 tests/                        ← Test files
│   ├── example.test.js ⭐          ← Example tests
│   ├── components.test.js
│   └── services.test.js
│
├── 📁 docs/                         ← Documentation
│   ├── SETUP.md                    ← Quick start
│   ├── PROJECT_STRUCTURE.md        ← Detailed structure
│   ├── DEVELOPMENT.md              ← Best practices
│   ├── ENV_VARIABLES.md            ← Configuration
│   ├── MIGRATION_GUIDE.md          ← Migration steps
│   ├── STRUCTURE_SUMMARY.md        ← Overview
│   └── QUICK_REFERENCE.md          ← This reference
│
├── 📁 config/                       ← Configuration folder
│
├── ⚙️ Configuration Files
│   ├── vite.config.js              ← Build tool config
│   ├── vitest.config.js            ← Testing config
│   ├── jsconfig.json               ← Path aliases
│   ├── .eslintrc.js                ← Linting rules
│   ├── .prettierrc                 ← Formatting rules
│   ├── .gitignore                  ← Git ignore
│   ├── .env                        ← Environment variables
│   ├── .env.example                ← Env template
│   └── .prettierignore             ← Prettier ignore
│
├── 📄 package.json                 ← Dependencies & scripts
└── 📄 README.md                    ← Project info


DATA FLOW ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════════

┌──────────────┐
│  User/Browser│
└──────┬───────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────────┐
│  src/index.html                     │  ← Entry point
│  └── src/js/main.js                 │
└─────────────────────────────────────┘
       │
       ├───────────────────────────────┬─────────────────────────────┐
       │                               │                             │
       ▼                               ▼                             ▼
┌─────────────────┐          ┌──────────────────┐          ┌──────────────┐
│ Pages & Views   │          │ Components       │          │ Utilities    │
│ (src/pages/)    │          │ (src/components/)│          │ (src/utils/) │
└────────┬────────┘          └────────┬─────────┘          └──────┬───────┘
         │                            │                          │
         └────────────────┬───────────┴──────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────┐
         │   Services Layer               │
         │   (src/services/api.js)        │
         │                                │
         │  • Error Handling              │
         │  • Request/Response            │
         │  • Interceptors                │
         └────────────────┬───────────────┘
                          │
                          ▼
         ┌────────────────────────────────┐
         │   Backend API                  │
         │   (import.meta.env.VITE_API_BASE_URL)
         └────────────────────────────────┘


IMPORT PATH SYSTEM (Path Aliases)
═══════════════════════════════════════════════════════════════════════════════

Configuration: jsconfig.json
Configured in: vite.config.js

┌─────────────────────────────────────────────────────────────────────┐
│ Before (❌ Relative paths)                                          │
│                                                                     │
│ import { formatDate } from '../../../utils/helpers.js'             │
│ import { toursAPI } from '../../services/api.js'                   │
│ import { validateEmail } from '../../../utils/validators.js'       │
└─────────────────────────────────────────────────────────────────────┘

                              ⬇️ MIGRATED TO ⬇️

┌─────────────────────────────────────────────────────────────────────┐
│ After (✅ Clean aliases)                                            │
│                                                                     │
│ import { formatDate } from '@utils/helpers.js'                     │
│ import { toursAPI } from '@services/api.js'                        │
│ import { validateEmail } from '@utils/validators.js'               │
│                                                                     │
│ Aliases:                                                            │
│   @           → src/                                                │
│   @components → src/components/                                     │
│   @utils      → src/utils/                                          │
│   @services   → src/services/                                       │
│   @css        → src/css/                                            │
│   @assets     → src/assets/                                         │
└─────────────────────────────────────────────────────────────────────┘


DEVELOPMENT WORKFLOW
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│ 1. START DEVELOPMENT                                                │
│    npm run dev                                                      │
│    → Starts Vite dev server on http://localhost:5173               │
│    → Hot module replacement enabled                                 │
└─────────────────────────────────────────────────────────────────────┘
                              ⬇️
┌─────────────────────────────────────────────────────────────────────┐
│ 2. WRITE CODE                                                       │
│    • src/js/MyComponent.js                                          │
│    • src/css/my-style.css                                           │
│    • src/utils/myHelper.js                                          │
└─────────────────────────────────────────────────────────────────────┘
                              ⬇️
┌─────────────────────────────────────────────────────────────────────┐
│ 3. CODE QUALITY                                                     │
│    npm run lint        → Find issues                                │
│    npm run lint:fix    → Auto-fix issues                            │
│    npm run format      → Format code                                │
└─────────────────────────────────────────────────────────────────────┘
                              ⬇️
┌─────────────────────────────────────────────────────────────────────┐
│ 4. TESTING                                                          │
│    npm run test        → Run all tests                              │
│    npm run test:ui     → Test UI                                    │
│    npm run test:coverage → Coverage report                          │
└─────────────────────────────────────────────────────────────────────┘
                              ⬇️
┌─────────────────────────────────────────────────────────────────────┐
│ 5. BUILD FOR PRODUCTION                                             │
│    npm run build       → Creates optimized dist/                    │
│    npm run preview     → Preview production build                   │
└─────────────────────────────────────────────────────────────────────┘
                              ⬇️
┌─────────────────────────────────────────────────────────────────────┐
│ 6. DEPLOY                                                           │
│    Upload dist/ to hosting                                          │
│    Done! 🚀                                                         │
└─────────────────────────────────────────────────────────────────────┘


UTILITY FUNCTIONS AT A GLANCE
═══════════════════════════════════════════════════════════════════════════════

src/utils/helpers.js
├── formatDate(date, format)
├── formatCurrency(amount, currency)
├── debounce(func, delay)
├── throttle(func, limit)
├── deepClone(obj)
├── isInViewport(element)
├── smoothScrollTo(element, offset)
├── getQueryParams()
├── setStorageWithExpiration(key, value, ms)
└── getStorageWithExpiration(key)

src/utils/validators.js
├── validateEmail(email)
├── validatePhone(phone)
├── validatePassword(password)
├── validateUrl(url)
├── validateDate(date)
├── validateForm(data, rules)
└── hasErrors(errors)

src/utils/constants.js
├── API_CONFIG
├── FEATURES
├── TOUR_CATEGORIES
├── VEHICLE_TYPES
├── BOOKING_STATUS
├── CURRENCY
├── STORAGE_KEYS
├── ERROR_MESSAGES
├── SUCCESS_MESSAGES
└── BREAKPOINTS


API ENDPOINTS STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

src/services/api.js
│
├── toursAPI
│   ├── getAll()
│   ├── getById(id)
│   ├── search(params)
│   ├── create(data)
│   ├── update(id, data)
│   └── delete(id)
│
├── destinationsAPI
│   ├── getAll()
│   ├── getById(id)
│   ├── getByCategory(category)
│   ├── create(data)
│   ├── update(id, data)
│   └── delete(id)
│
├── bookingsAPI
│   ├── getAll()
│   ├── getById(id)
│   ├── create(data)
│   ├── update(id, data)
│   └── cancel(id)
│
├── vehiclesAPI
│   ├── getAll()
│   ├── getById(id)
│   └── getByType(type)
│
└── chatAPI
    ├── sendMessage(message)
    └── getHistory()


ENVIRONMENT VARIABLES (.env)
═══════════════════════════════════════════════════════════════════════════════

VITE_API_BASE_URL          ← API endpoint
VITE_API_TIMEOUT           ← Request timeout
VITE_ENABLE_ANALYTICS      ← Feature flag
VITE_ENABLE_AI_CHAT        ← Feature flag
VITE_ENABLE_BOOKING        ← Feature flag
VITE_WHATSAPP_NUMBER       ← Contact info
VITE_GOOGLE_ANALYTICS_ID   ← Analytics ID
VITE_MAPS_API_KEY          ← Maps key
VITE_APP_NAME              ← App name
VITE_APP_VERSION           ← App version
VITE_ENVIRONMENT           ← dev/staging/production


BUILD OUTPUT
═══════════════════════════════════════════════════════════════════════════════

npm run build produces:

dist/
├── index.html              ← Minified
├── assets/
│   ├── images/             ← Optimized images
│   ├── fonts/              ← Font files
│   └── style.xxxxx.css     ← Bundled CSS
└── js/
    └── main.xxxxx.js       ← Bundled JS

This dist/ folder is production-ready and can be deployed directly!


KEY FEATURES
═══════════════════════════════════════════════════════════════════════════════

✨ Vite              - Lightning fast build tool
🔍 ESLint            - Code quality checking
📝 Prettier          - Code formatting
🧪 Vitest            - Unit testing
📦 Axios             - HTTP client
🎯 Path Aliases      - Clean imports
⚙️ Environment Config - Dev/prod settings
📚 Documentation     - Comprehensive guides
🚀 Production Ready   - Optimized builds
🏗️ Modular Structure  - Easy to maintain


QUICK COMMANDS REFERENCE
═══════════════════════════════════════════════════════════════════════════════

Development:
  npm run dev              🚀 Start dev server
  npm run build            📦 Build for production
  npm run preview          👀 Preview production

Code Quality:
  npm run lint             🔍 Check issues
  npm run lint:fix         ✨ Auto-fix
  npm run format           📝 Format code

Testing:
  npm run test             🧪 Run tests
  npm run test:ui          🖥️ Tests UI
  npm run test:coverage    📊 Coverage


DOCUMENTATION MAP
═══════════════════════════════════════════════════════════════════════════════

START HERE
    │
    ├─→ QUICK_REFERENCE.md (this file)      ⚡ Quick overview
    │
    ├─→ SETUP.md                            📖 Getting started
    │
    ├─→ PROJECT_STRUCTURE.md                📁 Directory details
    │
    ├─→ DEVELOPMENT.md                      💻 Best practices
    │
    ├─→ MIGRATION_GUIDE.md                  🔄 Migrate existing code
    │
    └─→ ENV_VARIABLES.md                    ⚙️ Configuration


═══════════════════════════════════════════════════════════════════════════════

              🎉 Your project is production-ready!

                    Ready to build amazing things? 🚀

═══════════════════════════════════════════════════════════════════════════════
*/
