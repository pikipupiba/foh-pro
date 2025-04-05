/**
 * Utility functions to test the rendering modes of Next.js pages
 */

/**
 * Tests if a page is using Static Site Generation (SSG)
 *
 * In SSG mode, the page should:
 * 1. Be pre-rendered at build time
 * 2. Have the same content on each request until rebuilt or revalidated
 *
 * @param {string} url - The URL of the page to test
 * @param {number} revalidateTime - The revalidation time in seconds (if using ISR)
 * @returns {Promise<boolean>} - True if the page is using SSG, false otherwise
 */
export async function testSSG(url, revalidateTime = 0) {
  try {
    // Make two requests in quick succession
    const response1 = await fetch(url);
    const html1 = await response1.text();

    // Extract the timestamp from the HTML
    const timestamp1 = extractTimestamp(html1);

    // Wait a short time (but less than revalidate time)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Make a second request
    const response2 = await fetch(url);
    const html2 = await response2.text();

    // Extract the timestamp from the second HTML
    const timestamp2 = extractTimestamp(html2);

    // If timestamps are the same, it's likely SSG
    const isSSG = timestamp1 === timestamp2;

    console.log(`SSG Test for ${url}:`);
    console.log(`- First timestamp: ${timestamp1}`);
    console.log(`- Second timestamp: ${timestamp2}`);
    console.log(`- Result: ${isSSG ? 'PASS ✅' : 'FAIL ❌'} (${isSSG ? 'Is SSG' : 'Not SSG'})`);

    // If using ISR, test revalidation
    if (revalidateTime > 0) {
      console.log(`Testing ISR with revalidate time of ${revalidateTime} seconds...`);

      // Wait for revalidation time plus a buffer
      await new Promise(resolve => setTimeout(resolve, (revalidateTime + 1) * 1000));

      // Make a third request after revalidation time
      const response3 = await fetch(url);
      const html3 = await response3.text();

      // Extract the timestamp from the third HTML
      const timestamp3 = extractTimestamp(html3);

      // If timestamp changed after revalidation time, it's ISR
      const isISR = timestamp3 !== timestamp2;

      console.log(`ISR Test for ${url}:`);
      console.log(`- Before revalidation: ${timestamp2}`);
      console.log(`- After revalidation: ${timestamp3}`);
      console.log(`- Result: ${isISR ? 'PASS ✅' : 'FAIL ❌'} (${isISR ? 'Is ISR' : 'Not ISR'})`);

      return isSSG;
    }

    return isSSG;
  } catch (error) {
    console.error(`Error testing SSG for ${url}:`, error);
    return false;
  }
}

/**
 * Tests if a page is using Server-Side Rendering (SSR)
 *
 * In SSR mode, the page should:
 * 1. Be rendered on each request
 * 2. Have different content on each request
 *
 * @param {string} url - The URL of the page to test
 * @returns {Promise<boolean>} - True if the page is using SSR, false otherwise
 */
export async function testSSR(url) {
  try {
    // Make two requests in quick succession
    const response1 = await fetch(url);
    const html1 = await response1.text();

    // Extract the timestamp from the HTML
    const timestamp1 = extractTimestamp(html1);

    // Wait a short time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Make a second request
    const response2 = await fetch(url);
    const html2 = await response2.text();

    // Extract the timestamp from the second HTML
    const timestamp2 = extractTimestamp(html2);

    // If timestamps are different, it's likely SSR
    const isSSR = timestamp1 !== timestamp2;

    console.log(`SSR Test for ${url}:`);
    console.log(`- First timestamp: ${timestamp1}`);
    console.log(`- Second timestamp: ${timestamp2}`);
    console.log(`- Result: ${isSSR ? 'PASS ✅' : 'FAIL ❌'} (${isSSR ? 'Is SSR' : 'Not SSR'})`);

    return isSSR;
  } catch (error) {
    console.error(`Error testing SSR for ${url}:`, error);
    return false;
  }
}

/**
 * Tests if a page is using Client-Side Rendering (CSR)
 *
 * In CSR mode, the page should:
 * 1. Initially show a loading state
 * 2. Then update with data fetched client-side
 *
 * @param {string} url - The URL of the page to test
 * @returns {Promise<boolean>} - True if the page is using CSR, false otherwise
 */
export async function testCSR(url) {
  try {
    // Make a request
    const response = await fetch(url);
    const html = await response.text();

    // Check if the HTML contains a loading indicator
    const hasLoadingIndicator = html.includes('Loading...');

    console.log(`CSR Test for ${url}:`);
    console.log(`- Has loading indicator: ${hasLoadingIndicator ? 'Yes' : 'No'}`);
    console.log(`- Result: ${hasLoadingIndicator ? 'PASS ✅' : 'FAIL ❌'} (${hasLoadingIndicator ? 'Likely CSR' : 'Might not be CSR'})`);

    return hasLoadingIndicator;
  } catch (error) {
    console.error(`Error testing CSR for ${url}:`, error);
    return false;
  }
}

/**
 * Helper function to extract a timestamp from HTML
 *
 * @param {string} html - The HTML to extract the timestamp from
 * @returns {string} - The extracted timestamp or 'Not found'
 */
function extractTimestamp(html) {
  // Look for timestamps in the format of ISO strings
  const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
  const match = html.match(timestampRegex);

  return match ? match[0] : 'Not found';
}

/**
 * Run all rendering tests on a set of pages
 *
 * @param {Object} pages - Object with page URLs and their expected rendering modes
 * @returns {Promise<Object>} - Results of the tests
 */
export async function testAllRenderingModes(pages) {
  const results = {};

  for (const [name, config] of Object.entries(pages)) {
    console.log(`\n=== Testing ${name} ===`);

    if (config.expectSSG) {
      results[name] = {
        ...results[name],
        ssg: await testSSG(config.url, config.revalidateTime || 0)
      };
    }

    if (config.expectSSR) {
      results[name] = {
        ...results[name],
        ssr: await testSSR(config.url)
      };
    }

    if (config.expectCSR) {
      results[name] = {
        ...results[name],
        csr: await testCSR(config.url)
      };
    }
  }

  return results;
}

/**
 * Run all rendering tests on a set of pages
 *
 * @param {Object} pages - Object with page URLs to test
 * @param {string} pages.ssg - URL of the SSG page
 * @param {string} pages.ssr - URL of the SSR page
 * @param {string} pages.csr - URL of the CSR page
 * @param {number} revalidateTime - Revalidation time for ISR in seconds
 * @returns {Promise<Object>} - Test results
 */
export async function runAllTests(pages, revalidateTime = 0) {
  console.log('🧪 Running rendering mode tests...');

  const results = {
    ssg: false,
    ssr: false,
    csr: false
  };

  if (pages.ssg) {
    console.log('\n📄 Testing Static Site Generation (SSG)...');
    results.ssg = await testSSG(pages.ssg, revalidateTime);
  }

  if (pages.ssr) {
    console.log('\n🖥️ Testing Server-Side Rendering (SSR)...');
    results.ssr = await testSSR(pages.ssr);
  }

  if (pages.csr) {
    console.log('\n🌐 Testing Client-Side Rendering (CSR)...');
    results.csr = await testCSR(pages.csr);
  }

  console.log('\n📊 Summary:');
  console.log(`- SSG: ${results.ssg ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`- SSR: ${results.ssr ? 'PASS ✅' : 'FAIL ❌'}`);
  console.log(`- CSR: ${results.csr ? 'PASS ✅' : 'FAIL ❌'}`);

  return results;
}
