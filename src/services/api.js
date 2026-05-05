/**
 * API Service - Centralized API client and endpoints
 * 
 * All API calls should be made through this service.
 * This ensures consistent error handling, logging, and configuration.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT;

// Create API client instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token or other headers
apiClient.interceptors.request.use((config) => {
  // Example: Add auth token
  // const token = localStorage.getItem('auth_token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

/**
 * Tours API
 */
export const toursAPI = {
  getAll: () => apiClient.get('/tours'),
  getById: (id) => apiClient.get(`/tours/${id}`),
  search: (params) => apiClient.get('/tours/search', { params }),
  create: (data) => apiClient.post('/tours', data),
  update: (id, data) => apiClient.put(`/tours/${id}`, data),
  delete: (id) => apiClient.delete(`/tours/${id}`),
};

/**
 * Destinations API
 */
export const destinationsAPI = {
  getAll: () => apiClient.get('/destinations'),
  getById: (id) => apiClient.get(`/destinations/${id}`),
  getByCategory: (category) => apiClient.get(`/destinations/category/${category}`),
  create: (data) => apiClient.post('/destinations', data),
  update: (id, data) => apiClient.put(`/destinations/${id}`, data),
  delete: (id) => apiClient.delete(`/destinations/${id}`),
};

/**
 * Bookings API
 */
export const bookingsAPI = {
  getAll: () => apiClient.get('/bookings'),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  create: (data) => apiClient.post('/bookings', data),
  update: (id, data) => apiClient.put(`/bookings/${id}`, data),
  cancel: (id) => apiClient.put(`/bookings/${id}/cancel`),
};

/**
 * Vehicles API
 */
export const vehiclesAPI = {
  getAll: () => apiClient.get('/vehicles'),
  getById: (id) => apiClient.get(`/vehicles/${id}`),
  getByType: (type) => apiClient.get(`/vehicles/type/${type}`),
};

/**
 * Chat API
 */
export const chatAPI = {
  sendMessage: (message) => apiClient.post('/chat', { message }),
  getHistory: () => apiClient.get('/chat/history'),
};

export default apiClient;
