/**
 * Form Validators
 * 
 * Validation functions for common form fields
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with details
 */
export const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };
  
  const isStrong = Object.values(requirements).every((req) => req);
  
  return {
    isStrong,
    requirements,
    score: Object.values(requirements).filter(Boolean).length,
  };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate date format
 * @param {string} date - Date string (YYYY-MM-DD)
 * @returns {boolean} True if valid date
 */
export const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Validate form data object
 * @param {Object} data - Form data
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = data[field];
    
    // Check required
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
      return;
    }
    
    // Check email
    if (fieldRules.email && value && !validateEmail(value)) {
      errors[field] = `${field} must be a valid email`;
      return;
    }
    
    // Check phone
    if (fieldRules.phone && value && !validatePhone(value)) {
      errors[field] = `${field} must be a valid phone number`;
      return;
    }
    
    // Check min length
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    // Check max length
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
      return;
    }
    
    // Check pattern (regex)
    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.patternMessage || `${field} format is invalid`;
      return;
    }
  });
  
  return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} True if any errors exist
 */
export const hasErrors = (errors) => Object.keys(errors).length > 0;

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUrl,
  validateDate,
  validateForm,
  hasErrors,
};
