// src/pages/test-ssr.tsx
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface SSRPageProps {
  serverTimestamp: string;
}

const SSRPage: NextPage<SSRPageProps> = ({ serverTimestamp }) => {
  return (
    <div>
      <Head>
        <title>Test SSR Page</title>
      </Head>
      <h1>Test SSR Page</h1>
      <p>This page was generated using Server-Side Rendering (SSR).</p>
      <p>Server Timestamp: {serverTimestamp}</p>
      <p>If you refresh the page, this timestamp SHOULD change, reflecting the time the server processed the request.</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async (context) => {
  // Simulate fetching data on the server for each request
  const serverTimestamp = new Date().toISOString();
  console.log(`[SSR] Generating test-ssr page at: ${serverTimestamp}`);

  // You can access request headers, query params, etc. from context
  // console.log('Request Headers:', context.req.headers);

  return {
    props: {
      serverTimestamp,
    },
  };
};

export default SSRPage;