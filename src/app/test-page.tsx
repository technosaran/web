'use client';

import React, { useState, useEffect } from 'react';

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Test page useEffect started');
    
    const timer = setTimeout(() => {
      console.log('Test page: Setting loading to false');
      setIsLoading(false);
    }, 1000);

    return () => {
      console.log('Test page: Cleaning up timer');
      clearTimeout(timer);
    };
  }, []);

  console.log('Test page render, isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">S</span>
            </div>
          </div>
          <p className="text-white text-lg">Test Loading...</p>
          <button
            onClick={() => setIsLoading(false)}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
          >
            Skip Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Test Page Loaded Successfully!
        </h1>
        <p className="text-gray-300 mb-6">
          If you can see this, the basic loading mechanism works.
        </p>
        <a 
          href="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Back to Main Page
        </a>
      </div>
    </div>
  );
}
