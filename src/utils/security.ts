import DOMPurify from 'dompurify';
import validator from 'validator';

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  }
  // Server-side fallback
  return input.replace(/<[^>]*>/g, '').trim();
};

export const sanitizeHTML = (html: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel']
    });
  }
  return html;
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email) && email.length <= 254;
};

export const validateName = (name: string): boolean => {
  const sanitized = sanitizeInput(name);
  return sanitized.length >= 2 && sanitized.length <= 50 && /^[a-zA-Z\s'-]+$/.test(sanitized);
};

export const validateMessage = (message: string): boolean => {
  const sanitized = sanitizeInput(message);
  return sanitized.length >= 10 && sanitized.length <= 1000;
};

export const validatePhone = (phone: string): boolean => {
  return validator.isMobilePhone(phone, 'any', { strictMode: false });
};

// Rate limiting for client-side
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length < this.maxAttempts) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, remainingTime);
  }
}

export const contactFormLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes

// Secure external link handler
export const createSecureLink = (url: string): { href: string; target: string; rel: string } => {
  const isExternal = !url.startsWith('/') && !url.startsWith('#') && !url.includes(window?.location?.hostname || '');
  
  return {
    href: url,
    target: isExternal ? '_blank' : '_self',
    rel: isExternal ? 'noopener noreferrer nofollow' : ''
  };
};

// Content Security Policy nonce generator (for inline scripts if needed)
export const generateNonce = (): string => {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2, 15);
};

// Error boundary helper
export const logSecurityEvent = (event: string, details?: any): void => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Security Event: ${event}`, details);
  }
  // In production, you might want to send this to a logging service
};
