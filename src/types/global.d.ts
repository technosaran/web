// Global type definitions for the portfolio application

declare global {
  interface Window {
    // Service Worker
    workbox?: any;

    // Analytics
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];

    // Performance monitoring
    webVitals?: {
      getCLS: (callback: (metric: any) => void) => void;
      getFCP: (callback: (metric: any) => void) => void;
      getFID: (callback: (metric: any) => void) => void;
      getLCP: (callback: (metric: any) => void) => void;
      getTTFB: (callback: (metric: any) => void) => void;
    };

    // Security
    CSP_NONCE?: string;
  }

  interface Navigator {
    // Network Information API
    connection?: {
      effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
      downlink: number;
      rtt: number;
      saveData: boolean;
    };

    // Device Memory API
    deviceMemory?: number;

    // Hardware Concurrency
    hardwareConcurrency?: number;
  }

  interface Performance {
    // Memory API
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }

  interface Document {
    // Feature Policy API
    featurePolicy?: {
      allowsFeature: (feature: string, origin?: string) => boolean;
      features: () => string[];
      allowedFeatures: () => string[];
      getAllowlistForFeature: (feature: string) => string[];
    };
  }
}

// Portfolio specific types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'blockchain' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  challenges?: string[];
  achievements?: string[];
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  icon?: string;
  yearsOfExperience?: number;
  projects?: string[]; // Project IDs
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
  location?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  skills?: string[];
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // For spam protection
}

export interface SecurityEvent {
  type: 'csp_violation' | 'xss_attempt' | 'rate_limit' | 'form_validation' | 'mixed_content';
  timestamp: number;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userAgent?: string;
  ip?: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
  connection?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
  device?: {
    memory?: number;
    cores?: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: number;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [field: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
  timestamp?: number;
}

export {};
