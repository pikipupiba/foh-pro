'use client';

import React, { useState, useEffect } from 'react';

export default function TestCSRPage() {
  const [currentTime, setCurrentTime] = useState<string>('Loading...');
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    // Update the time when the component mounts
    setCurrentTime(new Date().toISOString());
  }, []);

  const handleRefresh = () => {
    setCurrentTime(new Date().toISOString());
    setRefreshCount(prevCount => prevCount + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Client-Side Rendering (CSR) Test</h1>
      <p className="mb-4">
        This page is using Client-Side Rendering. The content is generated in the browser after the page loads.
      </p>
      <div className="p-4 bg-gray-800 rounded-md mb-4">
        <p className="text-white">
          <strong>Current time:</strong> {currentTime}
        </p>
        <p className="text-white mt-2">
          <strong>Refresh count:</strong> {refreshCount}
        </p>
      </div>
      <button
        onClick={handleRefresh}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Refresh Time
      </button>
    </div>
  );
}
