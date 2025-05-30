'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  blurDataURL,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || blurDataURL || '');
  const imgRef = useRef<HTMLImageElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority, // Skip intersection observer for priority images
  });

  // Load image when in view or if priority
  useEffect(() => {
    if (inView || priority) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      
      img.src = src;
    }
  }, [inView, priority, src, onLoad, onError]);

  // Generate placeholder if none provided
  const generatePlaceholder = (w: number = 400, h: number = 300) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#334155');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      
      // Add loading text
      ctx.fillStyle = '#64748b';
      ctx.font = '16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Loading...', w / 2, h / 2);
    }
    
    return canvas.toDataURL();
  };

  const defaultPlaceholder = generatePlaceholder(width, height);

  if (hasError) {
    return (
      <div 
        ref={ref}
        className={`flex items-center justify-center bg-slate-800 text-slate-400 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc || defaultPlaceholder}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105 blur-sm'
        }`}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-slate-300">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Higher-order component for progressive image enhancement
export const withProgressiveImage = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<any, P & { imageSrc?: string; imageAlt?: string }>((props, ref) => {
    const { imageSrc, imageAlt, ...rest } = props;
    
    if (imageSrc) {
      return (
        <div className="relative">
          <LazyImage src={imageSrc} alt={imageAlt || ''} className="absolute inset-0 w-full h-full object-cover" />
          <Component ref={ref} {...(rest as P)} />
        </div>
      );
    }
    
    return <Component ref={ref} {...(rest as P)} />;
  });
};

export default LazyImage;
