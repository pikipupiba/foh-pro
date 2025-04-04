// src/pages/test-ssg.tsx
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

interface SSGPageProps {
  buildTimestamp: string;
}

const SSGPage: NextPage<SSGPageProps> = ({ buildTimestamp }) => {
  return (
    <div>
      <Head>
        <title>Test SSG Page</title>
      </Head>
      <h1>Test SSG Page</h1>
      <p>This page was generated using Static Site Generation (SSG).</p>
      <p>Build Timestamp: {buildTimestamp}</p>
      <p>If you refresh the page (after deployment), this timestamp should NOT change until the next build.</p>
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
    // Optional: Add revalidate for Incremental Static Regeneration (ISR)
    // revalidate: 60, // Re-generate page every 60 seconds if requested
  };
};

export default SSGPage;