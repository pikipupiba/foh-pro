// src/pages/test-ssg.tsx
import { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface SSGPageProps {
  buildTimestamp: string;
  buildCount?: number; // Optional build counter
  // In a real app, you might include more data here
  // such as blog posts, product listings, etc.
}

const SSGPage: NextPage<SSGPageProps> = ({ buildTimestamp, buildCount = 1 }) => {
  // State for client-side timestamp
  const [clientTime, setClientTime] = useState<string>('');

  // Update client time only on the client side
  useEffect(() => {
    setClientTime(new Date().toISOString());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <Head>
        <title>Test SSG Page</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Test SSG Page with ISR</h1>

      <div className="mb-6 p-4 bg-card text-card-foreground rounded-lg border">
        <h2 className="text-xl font-semibold mb-2">How This Works</h2>
        <p className="mb-2">This page uses <strong>Static Site Generation (SSG)</strong> with <strong>Incremental Static Regeneration (ISR)</strong>.</p>
        <p className="mb-2">The page is statically generated at build time, but it can be regenerated after the revalidation period (30 seconds).</p>
        <p className="mb-2">If you refresh immediately, you&apos;ll see the same timestamp. If you wait 30+ seconds and refresh, a new version may be generated.</p>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm font-medium">To test this:</p>
          <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
            <li>Note the current build timestamp below</li>
            <li>Refresh the page a few times - the timestamp should remain the same</li>
            <li>Wait at least 30 seconds</li>
            <li>Refresh again - you should see a new timestamp (the page was regenerated)</li>
          </ol>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-card text-card-foreground">
        <h2 className="text-xl font-semibold mb-2">Page Information</h2>

        <div className="mb-6">
          <p className="mb-2"><strong>Static Build Timestamp:</strong></p>
          <div className="font-mono bg-muted text-muted-foreground p-3 rounded border">
            <p>{buildTimestamp}</p>
            <p className="text-sm mt-2">Build #<span className="font-semibold">{buildCount}</span></p>
            <p className="text-xs mt-2 text-muted-foreground">This timestamp is generated during static build and only changes after revalidation</p>
          </div>
        </div>

        <div>
          <p className="mb-2"><strong>Client-Side Information:</strong></p>
          <div className="font-mono bg-muted text-muted-foreground p-3 rounded border">
            <p>Current client time: {clientTime || 'Loading...'}</p>
            <p className="text-xs mt-2 text-muted-foreground">This timestamp is generated in your browser and changes with every page load</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// This simulates a database or external API that would provide the data
// In development mode, we use localStorage to persist the timestamp between refreshes
// In production, this would be handled by the ISR cache

// Helper function to get stored timestamp from a simulated "database"
const getStoredTimestamp = (): { time: string, lastUpdate: number, count: number } | null => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ssg-demo-timestamp');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Helper function to store timestamp in our simulated "database"
const storeTimestamp = (time: string, count: number) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ssg-demo-timestamp', JSON.stringify({
        time,
        lastUpdate: Date.now(),
        count
      }));
    } catch (e) {
      console.error('Failed to store timestamp:', e);
    }
  }
};

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  // Get the stored timestamp data
  const stored = getStoredTimestamp();
  let timestamp: string;
  let buildCount = 1;

  // Check if we need to generate a new timestamp
  if (!stored || Date.now() - stored.lastUpdate > 30000) {
    // Generate a new timestamp if:
    // 1. No timestamp exists yet, or
    // 2. The existing timestamp is older than 30 seconds
    timestamp = new Date().toISOString();
    buildCount = stored ? stored.count + 1 : 1;
    storeTimestamp(timestamp, buildCount);

    console.log(`[SSG] ${stored ? 'Revalidating' : 'Initial build of'} test-ssg page at: ${timestamp} (Build #${buildCount})`);
  } else {
    // Use the existing timestamp
    timestamp = stored.time;
    buildCount = stored.count;
    console.log(`[SSG] Serving cached version of test-ssg page from: ${timestamp} (Build #${buildCount})`);
  }

  return {
    props: {
      buildTimestamp: timestamp,
      buildCount: buildCount,
    },
    // Enable Incremental Static Regeneration (ISR)
    // This will only regenerate the page after 30 seconds have passed
    // and someone requests the page
    revalidate: 30, // Re-generate page every 30 seconds if requested
  };
};

export default SSGPage;