'use client';

import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const usePerformanceMonitor = () => {
  const reportMetric = useCallback((metric: PerformanceMetrics) => {
    // In production, you would send this to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric);
    }

    // Example: Send to analytics
    // analytics.track('performance_metric', metric);
  }, []);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              reportMetric({ lcp: lastEntry.startTime });
            }
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observation not supported');
        }
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart) {
                reportMetric({ fid: entry.processingStart - entry.startTime });
              }
            });
          });
          observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observation not supported');
        }
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        try {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            reportMetric({ cls: clsValue });
          });
          observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observation not supported');
        }
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                reportMetric({ fcp: entry.startTime });
              }
            });
          });
          observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP observation not supported');
        }
      }
    };

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0 && navigationEntries[0]) {
          const entry = navigationEntries[0];
          const ttfb = entry.responseStart - entry.requestStart;
          reportMetric({ ttfb });
        }
      }
    };

    // Initialize observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    measureTTFB();

    // Memory usage monitoring (development only)
    let memoryInterval: NodeJS.Timeout | undefined;
    if (process.env.NODE_ENV === 'development') {
      const monitorMemory = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          console.log('Memory Usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          });
        }
      };

      memoryInterval = setInterval(monitorMemory, 30000); // Every 30 seconds
    }

    return () => {
      if (memoryInterval) {
        clearInterval(memoryInterval);
      }
    };
  }, [reportMetric]);

  // Resource timing analysis
  const analyzeResourceTiming = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const slowResources = resources.filter(resource => resource.duration > 1000);

    if (slowResources.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('Slow loading resources detected:', slowResources.map(r => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize
      })));
    }
  }, []);

  // Network information
  const getNetworkInfo = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }

    return null;
  }, []);

  return {
    analyzeResourceTiming,
    getNetworkInfo,
    reportMetric
  };
};
