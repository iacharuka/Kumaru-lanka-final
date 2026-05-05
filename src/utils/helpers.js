/**
 * Common Utility Functions
 * 
 * Reusable helper functions for common operations
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format pattern (e.g., 'MM/DD/YYYY')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
};

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (e.g., 'USD', 'LKR')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function for rate limiting
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element
 * @returns {boolean} True if element is visible in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to element
 * @param {Element} element - Target element
 * @param {number} offset - Offset from top in pixels
 */
export const smoothScrollTo = (element, offset = 0) => {
  const target = element.offsetTop - offset;
  window.scrollTo({
    top: target,
    behavior: 'smooth',
  });
};

/**
 * Get URL query parameters
 * @returns {Object} Query parameters as key-value pairs
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

/**
 * Store data in localStorage with expiration
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @param {number} expirationMs - Expiration time in milliseconds
 */
export const setStorageWithExpiration = (key, value, expirationMs) => {
  const item = {
    value,
    expiration: Date.now() + expirationMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Get data from localStorage with expiration check
 * @param {string} key - Storage key
 * @returns {*} Stored value or null if expired
 */
export const getStorageWithExpiration = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  const { value, expiration } = JSON.parse(item);
  if (Date.now() > expiration) {
    localStorage.removeItem(key);
    return null;
  }
  
  return value;
};

export default {
  formatDate,
  formatCurrency,
  debounce,
  throttle,
  deepClone,
  isInViewport,
  smoothScrollTo,
  getQueryParams,
  setStorageWithExpiration,
  getStorageWithExpiration,
};
