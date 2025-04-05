// src/pages/test-ssg.tsx
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface SSGPageProps {
  buildTimestamp: string;
}

const SSGPage: NextPage<SSGPageProps> = ({ buildTimestamp }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Test SSG Page</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Test SSG Page with ISR</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">How This Works</h2>
        <p className="mb-2">This page uses <strong>Static Site Generation (SSG)</strong> with <strong>Incremental Static Regeneration (ISR)</strong>.</p>
        <p className="mb-2">The page is statically generated at build time, but it can be regenerated after the revalidation period (30 seconds).</p>
        <p>If you refresh immediately, you'll see the same timestamp. If you wait 30+ seconds and refresh, a new version may be generated.</p>
      </div>

      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Page Information</h2>
        <p className="mb-2"><strong>Build/Regeneration Timestamp:</strong></p>
        <p className="font-mono bg-gray-100 p-2 rounded">{buildTimestamp}</p>
        <p className="mt-4 text-sm text-gray-600">Current client time: {new Date().toISOString()}</p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  // Simulate fetching data at build time
  const buildTimestamp = new Date().toISOString();
  console.log(`[SSG] Generating test-ssg page at: ${buildTimestamp}`);

  return {
    props: {
      buildTimestamp,
    },
    // Enable Incremental Static Regeneration (ISR)
    // This will only regenerate the page after 30 seconds have passed
    // and someone requests the page
    revalidate: 30, // Re-generate page every 30 seconds if requested
  };
};

export default SSGPage;