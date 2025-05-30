'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-purple-500 border-t-transparent',
    secondary: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          border-2 rounded-full animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-300 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
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
}> = ({ 
  lines = 3, 
  className = '',
  avatar = false 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="w-12 h-12 bg-slate-700 rounded-full mb-4"></div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 bg-slate-700 rounded ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
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
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-lg">
        <LoadingSpinner text={text} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
