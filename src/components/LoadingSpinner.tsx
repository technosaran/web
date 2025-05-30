'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'border-purple-500 border-t-transparent',
    secondary: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={` ${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-2`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className={`${textSizeClasses[size]} animate-pulse text-gray-300`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
        <div className="rounded-xl border border-purple-500/20 bg-slate-800/50 p-8 backdrop-blur-sm">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

// Skeleton loader for content
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
  avatar?: boolean;
}> = ({ lines = 3, className = '', avatar = false }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && <div className="mb-4 h-12 w-12 rounded-full bg-slate-700"></div>}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded bg-slate-700 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Loading overlay for sections
export const SectionLoader: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
}> = ({ isLoading, children, text = 'Loading...' }) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-900/50 backdrop-blur-sm">
        <LoadingSpinner text={text} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
