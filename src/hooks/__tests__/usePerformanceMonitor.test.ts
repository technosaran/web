import { renderHook, act } from '@testing-library/react';
import { usePerformanceMonitor } from '../usePerformanceMonitor';

// Mock PerformanceObserver
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
};

const mockPerformanceObserver = jest.fn().mockImplementation(() => mockObserver);
global.PerformanceObserver = mockPerformanceObserver;

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => 1000),
  getEntriesByType: jest.fn(() => [
    {
      responseStart: 100,
      requestStart: 50,
    },
  ]),
  memory: {
    usedJSHeapSize: 1000000,
    jsHeapSizeLimit: 2000000,
  },
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

// Mock fetch
global.fetch = jest.fn();

describe('usePerformanceMonitor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default options', () => {
    const { result } = renderHook(() => usePerformanceMonitor());

    expect(result.current.metrics).toBeDefined();
    expect(result.current.alerts).toEqual([]);
    expect(result.current.thresholds).toBeDefined();
  });

  it('sets up performance observers', () => {
    renderHook(() => usePerformanceMonitor());

    // Should create observers for different entry types
    expect(mockPerformanceObserver).toHaveBeenCalledTimes(4);
    expect(mockObserver.observe).toHaveBeenCalledWith({ entryTypes: ['paint'] });
    expect(mockObserver.observe).toHaveBeenCalledWith({ entryTypes: ['layout-shift'] });
    expect(mockObserver.observe).toHaveBeenCalledWith({ entryTypes: ['largest-contentful-paint'] });
    expect(mockObserver.observe).toHaveBeenCalledWith({ entryTypes: ['first-input'] });
  });

  it('measures custom metrics', async () => {
    const { result } = renderHook(() => usePerformanceMonitor({ enableLogging: false }));

    const mockFn = jest.fn();

    await act(async () => {
      result.current.measureCustomMetric('test-operation', mockFn);
    });

    expect(mockFn).toHaveBeenCalled();
  });

  it('calculates performance score', () => {
    const { result } = renderHook(() => usePerformanceMonitor());

    const score = result.current.getPerformanceScore();
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('clears alerts', () => {
    const { result } = renderHook(() => usePerformanceMonitor());

    act(() => {
      result.current.clearAlerts();
    });

    expect(result.current.alerts).toEqual([]);
  });

  it('handles memory monitoring when disabled', () => {
    const { result } = renderHook(() => usePerformanceMonitor({ enableMemoryMonitoring: false }));

    expect(result.current.metrics.memoryUsage).toBeUndefined();
  });

  it('handles network monitoring when disabled', () => {
    const { result } = renderHook(() => usePerformanceMonitor({ enableNetworkMonitoring: false }));

    expect(result.current.metrics.connectionType).toBeUndefined();
  });

  it('reports metrics when enabled', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    renderHook(() =>
      usePerformanceMonitor({
        enableReporting: true,
        reportingEndpoint: '/test-endpoint',
      })
    );

    // Note: In a real test, you'd trigger a performance entry
    // This is a simplified test structure
  });
});
