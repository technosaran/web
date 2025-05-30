'use client';

import { useEffect, useCallback, useRef, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
  memoryUsage?: number;
  connectionType?: string;
}

interface PerformanceMonitorOptions {
  enableLogging?: boolean;
  enableReporting?: boolean;
  reportingEndpoint?: string;
  enableMemoryMonitoring?: boolean;
  enableNetworkMonitoring?: boolean;
}

interface PerformanceAlert {
  type: 'warning' | 'error';
  metric: string;
  value: number;
  threshold: number;
  message: string;
}

export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  const {
    enableLogging = process.env.NODE_ENV === 'development',
    enableReporting = false,
    reportingEndpoint = '/api/performance',
    enableMemoryMonitoring = true,
    enableNetworkMonitoring = true,
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({});
  const observerRef = useRef<PerformanceObserver[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);

  // Performance thresholds (in milliseconds)
  const thresholds = {
    fcp: 1800, // Good: < 1.8s
    lcp: 2500, // Good: < 2.5s
    fid: 100, // Good: < 100ms
    cls: 0.1, // Good: < 0.1
    ttfb: 800, // Good: < 800ms
    inp: 200, // Good: < 200ms
  };

  const createAlert = useCallback(
    (metric: string, value: number, threshold: number): PerformanceAlert => {
      const isError = value > threshold * 1.5;
      return {
        type: isError ? 'error' : 'warning',
        metric,
        value,
        threshold,
        message: `${metric.toUpperCase()} is ${isError ? 'critically' : 'moderately'} slow: ${value.toFixed(2)}ms (threshold: ${threshold}ms)`,
      };
    },
    []
  );

  const checkThreshold = useCallback(
    (metric: string, value: number) => {
      const threshold = thresholds[metric as keyof typeof thresholds];
      if (threshold && value > threshold) {
        const alert = createAlert(metric, value, threshold);
        setAlerts(prev => [...prev.slice(-4), alert]); // Keep last 5 alerts
      }
    },
    [createAlert]
  );

  const logMetric = useCallback(
    (name: string, value: number) => {
      if (enableLogging) {
        console.log(`🚀 Performance Metric - ${name}:`, `${value.toFixed(2)}ms`);
      }
    },
    [enableLogging]
  );

  const reportMetric = useCallback(
    async (name: string, value: number) => {
      if (!enableReporting) return;

      try {
        await fetch(reportingEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            metric: name,
            value,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            connection: (navigator as any).connection?.effectiveType || 'unknown',
          }),
        });
      } catch (error) {
        console.warn('Failed to report performance metric:', error);
      }
    },
    [enableReporting, reportingEndpoint]
  );

  const handlePerformanceEntry = useCallback(
    (entry: PerformanceEntry) => {
      const value = 'value' in entry ? (entry as any).value : entry.duration;

      switch (entry.name) {
        case 'first-contentful-paint':
          metricsRef.current.fcp = value;
          logMetric('FCP', value);
          reportMetric('fcp', value);
          checkThreshold('fcp', value);
          break;
        case 'largest-contentful-paint':
          metricsRef.current.lcp = value;
          logMetric('LCP', value);
          reportMetric('lcp', value);
          checkThreshold('lcp', value);
          break;
        case 'first-input-delay':
          metricsRef.current.fid = value;
          logMetric('FID', value);
          reportMetric('fid', value);
          checkThreshold('fid', value);
          break;
        case 'cumulative-layout-shift':
          metricsRef.current.cls = value;
          logMetric('CLS', value);
          reportMetric('cls', value);
          checkThreshold('cls', value);
          break;
      }
    },
    [logMetric, reportMetric, checkThreshold]
  );

  // Monitor memory usage
  const monitorMemory = useCallback(() => {
    if (!enableMemoryMonitoring || !(performance as any).memory) return;

    const memory = (performance as any).memory;
    const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    metricsRef.current.memoryUsage = memoryUsage;

    if (memoryUsage > 0.8) {
      const alert = createAlert('memory', memoryUsage * 100, 80);
      setAlerts(prev => [...prev.slice(-4), alert]);
    }
  }, [enableMemoryMonitoring, createAlert]);

  // Monitor network connection
  const monitorNetwork = useCallback(() => {
    if (!enableNetworkMonitoring || !(navigator as any).connection) return;

    const connection = (navigator as any).connection;
    metricsRef.current.connectionType = connection.effectiveType;

    if (enableLogging) {
      console.log('🌐 Network Info:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      });
    }
  }, [enableNetworkMonitoring, enableLogging]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return undefined;
    }

    const observers: PerformanceObserver[] = [];

    try {
      // Observe paint metrics
      const paintObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(handlePerformanceEntry);
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      observers.push(paintObserver);

      // Observe layout shift metrics
      const layoutShiftObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(handlePerformanceEntry);
      });
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      observers.push(layoutShiftObserver);

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(handlePerformanceEntry);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      observers.push(lcpObserver);

      // Observe first input delay
      const fidObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(handlePerformanceEntry);
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.push(fidObserver);

      observerRef.current = observers;

      // Monitor memory and network periodically
      const interval = setInterval(() => {
        monitorMemory();
        monitorNetwork();
      }, 5000);

      return () => {
        observers.forEach(observer => observer.disconnect());
        clearInterval(interval);
      };
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
      return undefined;
    }
  }, [handlePerformanceEntry, monitorMemory, monitorNetwork]);

  // Measure TTFB
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const measureTTFB = () => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        metricsRef.current.ttfb = ttfb;
        logMetric('TTFB', ttfb);
        reportMetric('ttfb', ttfb);
        checkThreshold('ttfb', ttfb);
      }
    };

    if (document.readyState === 'complete') {
      measureTTFB();
    } else {
      window.addEventListener('load', measureTTFB);
      return () => window.removeEventListener('load', measureTTFB);
    }
    return undefined;
  }, [logMetric, reportMetric, checkThreshold]);

  const getMetrics = useCallback(() => ({ ...metricsRef.current }), []);

  const measureCustomMetric = useCallback(
    (name: string, fn: () => void | Promise<void>) => {
      const start = performance.now();

      const finish = () => {
        const duration = performance.now() - start;
        logMetric(`Custom: ${name}`, duration);
        reportMetric(`custom_${name}`, duration);
      };

      try {
        const result = fn();
        if (result instanceof Promise) {
          return result.finally(finish);
        } else {
          finish();
          return result;
        }
      } catch (error) {
        finish();
        throw error;
      }
    },
    [logMetric, reportMetric]
  );

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const getPerformanceScore = useCallback(() => {
    const metrics = getMetrics();
    let score = 100;

    // Deduct points based on metrics
    if (metrics.fcp && metrics.fcp > thresholds.fcp) score -= 20;
    if (metrics.lcp && metrics.lcp > thresholds.lcp) score -= 25;
    if (metrics.fid && metrics.fid > thresholds.fid) score -= 20;
    if (metrics.cls && metrics.cls > thresholds.cls) score -= 15;
    if (metrics.ttfb && metrics.ttfb > thresholds.ttfb) score -= 20;

    return Math.max(0, score);
  }, [getMetrics]);

  return {
    metrics: metricsRef.current,
    alerts,
    getMetrics,
    measureCustomMetric,
    clearAlerts,
    getPerformanceScore,
    thresholds,
  };
}
