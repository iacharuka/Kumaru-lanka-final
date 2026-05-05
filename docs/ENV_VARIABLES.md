# Environment Variables

This project uses environment variables for configuration. You can set different values for different environments (development, staging, production).

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update values in `.env` for your local environment

3. Never commit `.env` - it's in `.gitignore`

## Variables

### API Configuration
- `VITE_API_BASE_URL` - Base URL for API requests
- `VITE_API_TIMEOUT` - Request timeout in milliseconds

### Feature Flags
- `VITE_ENABLE_ANALYTICS` - Enable Google Analytics
- `VITE_ENABLE_AI_CHAT` - Enable AI chat feature
- `VITE_ENABLE_BOOKING` - Enable booking functionality

### External Services
- `VITE_WHATSAPP_NUMBER` - WhatsApp contact number (with country code)
- `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID
- `VITE_MAPS_API_KEY` - Google Maps API key

### App Settings
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_ENVIRONMENT` - Current environment (development, staging, production)

## Accessing Variables in Code

In your JavaScript files, access variables using `import.meta.env`:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isProductionBuild = import.meta.env.VITE_ENVIRONMENT === 'production';

if (import.meta.env.VITE_ENABLE_ANALYTICS) {
  // Initialize analytics
}
```

## Environment-Specific Configs

Create different `.env` files for different environments:

- `.env` - Default (development)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

Switch environments:
```bash
npm run dev               # Uses .env
npm run build            # Uses .env for build
```

Or specify environment:
```bash
NODE_ENV=production npm run build
```

## Security

⚠️ **Important:**
- Never commit `.env` to Git
- Don't put sensitive secrets in .env (use secrets management for production)
- All `VITE_` prefixed variables are exposed to the browser
- Only use `VITE_` for public variables
