// src/pages/test-csr.tsx
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

const CSRPage: NextPage = () => {
  const [clientTimestamp, setClientTimestamp] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data client-side after initial render
    console.log('[CSR] Fetching data client-side...');
    setLoading(true);
    // In a real app, this would be an API call
    const fetchTimestamp = () => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(new Date().toISOString());
        }, 500); // Simulate network delay
      });
    };

    fetchTimestamp().then(timestamp => {
      console.log('[CSR] Data fetched:', timestamp);
      setClientTimestamp(timestamp);
      setLoading(false);
    });

    // Cleanup function (optional)
    return () => {
      console.log('[CSR] Cleaning up effect.');
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <Head>
        <title>Test CSR Page</title>
      </Head>
      <h1>Test CSR Page</h1>
      <p>This page uses Client-Side Rendering (CSR) to fetch data after the initial load.</p>
      <div>
        Client Timestamp: {loading ? 'Loading...' : clientTimestamp}
      </div>
      <p>If you refresh the page, you should briefly see &quot;Loading...&quot; before the timestamp appears. The timestamp reflects the time the data was fetched in the browser.</p>
    </div>
  );
};

export default CSRPage;