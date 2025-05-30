'use client';

import { useEffect } from 'react';

export const useSecurityHeaders = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Check for security headers
    const checkSecurityHeaders = async () => {
      try {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        const headers = response.headers;

        const securityChecks = {
          'Content-Security-Policy': headers.get('Content-Security-Policy'),
          'X-Frame-Options': headers.get('X-Frame-Options'),
          'X-Content-Type-Options': headers.get('X-Content-Type-Options'),
          'Referrer-Policy': headers.get('Referrer-Policy'),
          'Permissions-Policy': headers.get('Permissions-Policy'),
          'Strict-Transport-Security': headers.get('Strict-Transport-Security'),
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('Security Headers Check:', securityChecks);

          // Warn about missing security headers
          Object.entries(securityChecks).forEach(([header, value]) => {
            if (!value) {
              console.warn(`Missing security header: ${header}`);
            }
          });
        }
      } catch (error) {
        console.warn('Could not check security headers:', error);
      }
    };

    checkSecurityHeaders();
  }, []);

  // Content Security Policy violation reporting
  useEffect(() => {
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      console.error('CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
      });

      // In production, you would report this to your security monitoring service
      if (process.env.NODE_ENV === 'production') {
        // reportSecurityViolation(event);
      }
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  // Check for mixed content
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMixedContent = () => {
      const isHTTPS = window.location.protocol === 'https:';
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      if (isHTTPS) {
        const httpResources = resources.filter(
          resource => resource.name.startsWith('http://') && !resource.name.startsWith('https://')
        );

        if (httpResources.length > 0) {
          console.warn(
            'Mixed content detected:',
            httpResources.map(r => r.name)
          );
        }
      }
    };

    // Check after page load
    if (document.readyState === 'complete') {
      checkMixedContent();
      return;
    }

    window.addEventListener('load', checkMixedContent);
    return () => window.removeEventListener('load', checkMixedContent);
  }, []);

  // Detect potential XSS attempts
  useEffect(() => {
    const detectXSS = () => {
      const url = window.location.href;
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /eval\(/i,
        /document\.write/i,
      ];

      const hasSuspiciousContent = suspiciousPatterns.some(
        pattern => pattern.test(url) || pattern.test(document.documentElement.innerHTML)
      );

      if (hasSuspiciousContent) {
        console.warn('Potential XSS attempt detected');
        // In production, you would report this and potentially block the request
      }
    };

    detectXSS();
  }, []);

  // Monitor for clickjacking attempts
  useEffect(() => {
    const detectClickjacking = () => {
      if (window.top !== window.self) {
        console.warn('Page is being loaded in a frame - potential clickjacking attempt');

        // Optional: Break out of frame
        // window.top.location = window.self.location;
      }
    };

    detectClickjacking();
  }, []);

  // Secure cookie check
  useEffect(() => {
    const checkCookieSecurity = () => {
      const cookies = document.cookie.split(';');

      cookies.forEach(cookie => {
        const [name] = cookie.trim().split('=');

        // Check if sensitive cookies are secure
        if (
          name &&
          (name.toLowerCase().includes('session') ||
            name.toLowerCase().includes('auth') ||
            name.toLowerCase().includes('token'))
        ) {
          if (!cookie.includes('Secure') || !cookie.includes('HttpOnly')) {
            console.warn(`Insecure cookie detected: ${name}`);
          }
        }
      });
    };

    checkCookieSecurity();
  }, []);

  // Feature policy check
  useEffect(() => {
    if (typeof window === 'undefined' || !('featurePolicy' in document)) return;

    const checkFeaturePolicy = () => {
      const dangerousFeatures = ['camera', 'microphone', 'geolocation', 'payment'];

      dangerousFeatures.forEach(feature => {
        try {
          const allowed = (document as any).featurePolicy.allowsFeature(feature);
          if (allowed) {
            console.warn(`Potentially dangerous feature allowed: ${feature}`);
          }
        } catch (error) {
          // Feature not supported
        }
      });
    };

    checkFeaturePolicy();
  }, []);

  return {
    // Utility functions for manual security checks
    checkSecurityHeaders: () => {
      // Implementation for manual header check
    },
    reportSecurityIssue: (issue: string, details?: any) => {
      console.warn('Security Issue:', issue, details);
      // In production, send to security monitoring service
    },
  };
};
