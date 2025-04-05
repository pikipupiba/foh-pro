/**
 * @jest-environment node
 */

// This test verifies that our pages are using the correct rendering modes
// We're using the node environment because we need to make HTTP requests

// Import fetch for Node.js environment
const fetch = require('node-fetch');

// Define the base URL for testing
const BASE_URL = 'http://localhost:3000';

// Define the pages to test
const PAGES = {
  SSG: `${BASE_URL}/test-ssg`,
  SSR: `${BASE_URL}/test-ssr`,
  CSR: `${BASE_URL}/test-csr`,
};

// Helper function to extract a timestamp from HTML
function extractTimestamp(html) {
  // This regex looks for an ISO timestamp format
  const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
  const match = html.match(timestampRegex);
  return match ? match[0] : null;
}

// Skip these tests if the server is not running
const describeIfServerRunning = process.env.SKIP_SERVER_TESTS ? describe.skip : describe;

describeIfServerRunning('Rendering Mode Tests', () => {
  // Check if the server is running before all tests
  beforeAll(async () => {
    try {
      await fetch(BASE_URL);
    } catch (error) {
      console.error(`
        ❌ Server not running at ${BASE_URL}
        These tests require the Next.js development server to be running.
        Start it with: npm run dev
      `);
      process.env.SKIP_SERVER_TESTS = 'true';
    }
  });

  describe('Static Site Generation (SSG)', () => {
    it('should have a build timestamp in the HTML', async () => {
      // Make a request to the SSG page
      const response = await fetch(PAGES.SSG);
      const html = await response.text();
      const timestamp = extractTimestamp(html);

      // Verify timestamp is extracted
      expect(timestamp).not.toBeNull();

      // Check that the page contains the expected SSG content
      expect(html).toContain('Static Site Generation (SSG)');
      expect(html).toContain('Build/Regeneration Timestamp');

      // In development mode with isrMemoryCacheSize: 0, the page will be regenerated on every request
      // So we can't reliably test that the timestamp stays the same
      console.log(`SSG page timestamp: ${timestamp}`);
    }, 10000); // Increase timeout for network requests
  });

  describe('Server-Side Rendering (SSR)', () => {
    it('should return different content on each request', async () => {
      // Make two requests in quick succession
      const response1 = await fetch(PAGES.SSR);
      const html1 = await response1.text();
      const timestamp1 = extractTimestamp(html1);

      // Wait a short time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Make a second request
      const response2 = await fetch(PAGES.SSR);
      const html2 = await response2.text();
      const timestamp2 = extractTimestamp(html2);

      // Verify timestamps are extracted
      expect(timestamp1).not.toBeNull();
      expect(timestamp2).not.toBeNull();

      // If timestamps are different, it's SSR
      expect(timestamp1).not.toEqual(timestamp2);
    }, 10000); // Increase timeout for network requests
  });

  describe('Client-Side Rendering (CSR)', () => {
    it('should include a loading indicator in the initial HTML', async () => {
      // Make a request
      const response = await fetch(PAGES.CSR);
      const html = await response.text();

      // Check if the HTML contains a loading indicator
      expect(html).toContain('Loading...');
    }, 10000); // Increase timeout for network requests
  });
});
