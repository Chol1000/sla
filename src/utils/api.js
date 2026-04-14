const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Sanitize any string before displaying it from an external source.
 * Removes HTML tags and dangerous characters.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Strip HTML tags from a string (for plain text display).
 */
export const stripHtml = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.textContent = String(html);
  return div.textContent;
};

/**
 * Validate email format on the client side.
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
};

/**
 * Validate phone number on the client side.
 */
export const isValidPhone = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

/**
 * Secure fetch wrapper.
 * - Sets correct headers
 * - Never exposes raw server errors to the UI
 * - Handles 429 rate-limit responses gracefully
 */
export const secureFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a few minutes and try again.');
    }
    if (response.status === 400) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Surface the first validation error message — never raw stack traces
        const msg = data.detail || data.error || data.message
          || Object.values(data)[0]?.[0]
          || 'Please check your submission and try again.';
        throw new Error(String(msg));
      }
    }
    if (response.status === 500) {
      throw new Error('A server error occurred. Please try again later.');
    }
    throw new Error('Something went wrong. Please try again.');
  }

  return response.json();
};

export default API_URL;
