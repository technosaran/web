// Performance optimization utilities

// Debounce function for scroll events and form inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  // Add to head if not already present
  if (!document.querySelector(`link[href="${href}"]`)) {
    document.head.appendChild(link);
  }
};

// Prefetch resources for better navigation
export const prefetchResource = (href: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;

  if (!document.querySelector(`link[href="${href}"]`)) {
    document.head.appendChild(link);
  }
};

// Image optimization helper
export const getOptimizedImageUrl = (
  src: string,
  _width?: number,
  _quality: number = 75
): string => {
  // For static exports, return original URL
  // In a real deployment, you might use a service like Cloudinary or Vercel's image optimization
  return src;
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    fn();
    return;
  }

  const startTime = performance.now();
  fn();
  const endTime = performance.now();

  console.log(`${name} took ${endTime - startTime} milliseconds`);
};

// Web Vitals tracking
export const trackWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  // Track Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP tracking not supported');
    }
  }
};

// Memory usage monitoring (development only)
export const monitorMemoryUsage = (): void => {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;

  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};

// Efficient scroll position tracking
export const createScrollTracker = (callback: (scrollY: number) => void) => {
  let ticking = false;

  const updateScrollPosition = () => {
    callback(window.scrollY);
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  return throttle(requestTick, 16); // ~60fps
};

// Bundle size analyzer helper
export const logBundleSize = (): void => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // This would typically be used with a webpack bundle analyzer
    console.log('Bundle analysis available in development mode');
  }
};
