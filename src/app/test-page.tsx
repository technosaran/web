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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-6 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                S
              </span>
            </div>
          </div>
          <p className="text-lg text-white">Test Loading...</p>
          <button
            onClick={() => setIsLoading(false)}
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
          >
            Skip Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Test Page Loaded Successfully!</h1>
        <p className="mb-6 text-gray-300">
          If you can see this, the basic loading mechanism works.
        </p>
        <a
          href="/"
          className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
        >
          Back to Main Page
        </a>
      </div>
    </div>
  );
}
