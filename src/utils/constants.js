/**
 * Application Constants
 * 
 * Central place for all constant values used throughout the app
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Feature Flags
export const FEATURES = {
  ANALYTICS_ENABLED: import.meta.env.VITE_ENABLE_ANALYTICS,
  AI_CHAT_ENABLED: import.meta.env.VITE_ENABLE_AI_CHAT,
  BOOKING_ENABLED: import.meta.env.VITE_ENABLE_BOOKING,
};

// Contact Information
export const CONTACT_INFO = {
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,
  PHONE: '+94XXXXXXXXX', // Add your phone
  EMAIL: 'info@kumaru-lanka.com',
  ADDRESS: 'Sri Lanka',
};

// External Service Keys
export const EXTERNAL_SERVICES = {
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_MAPS_API_KEY,
};

// Application Metadata
export const APP_INFO = {
  NAME: import.meta.env.VITE_APP_NAME,
  VERSION: import.meta.env.VITE_APP_VERSION,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
};

// Tour Categories
export const TOUR_CATEGORIES = {
  ADVENTURE: 'adventure',
  CULTURAL: 'cultural',
  NATURE: 'nature',
  RELAXATION: 'relaxation',
  FAMILY: 'family',
};

// Vehicle Types
export const VEHICLE_TYPES = {
  SEDAN: 'sedan',
  SUV: 'suv',
  VAN: 'van',
  COACH: 'coach',
  TUKTUKS: 'tuktuks',
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

// Rating Scale
export const RATING_SCALE = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  TERRIBLE: 1,
};

// Currency
export const CURRENCY = {
  CODE: 'LKR',
  SYMBOL: 'Rs.',
};

// Date Format Patterns
export const DATE_FORMATS = {
  DISPLAY: 'MM/DD/YYYY',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'kumaru_user_data',
  BOOKINGS: 'kumaru_bookings',
  PREFERENCES: 'kumaru_preferences',
  AUTH_TOKEN: 'kumaru_auth_token',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Your booking has been created successfully!',
  BOOKING_UPDATED: 'Your booking has been updated.',
  BOOKING_CANCELLED: 'Your booking has been cancelled.',
  PROFILE_UPDATED: 'Your profile has been updated.',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
};

// Animation Durations (in ms)
export const ANIMATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440,
};

export default {
  API_CONFIG,
  FEATURES,
  CONTACT_INFO,
  EXTERNAL_SERVICES,
  APP_INFO,
  TOUR_CATEGORIES,
  VEHICLE_TYPES,
  BOOKING_STATUS,
  RATING_SCALE,
  CURRENCY,
  DATE_FORMATS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PAGINATION,
  ANIMATIONS,
  BREAKPOINTS,
};
