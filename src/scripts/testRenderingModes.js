// This script tests the rendering modes of our Next.js pages
import { runAllTests } from '../utils/renderingTests';

// Define the base URL for testing
const BASE_URL = 'http://localhost:3000';

// Define the pages to test
const pages = {
  ssg: `${BASE_URL}/test-ssg`,
  ssr: `${BASE_URL}/test-ssr`,
  csr: `${BASE_URL}/test-csr`
};

// Run the tests with a revalidation time of 30 seconds for ISR
async function runTests() {
  console.log('🧪 Starting rendering mode tests...');
  console.log('Make sure your Next.js server is running on http://localhost:3000');
  
  try {
    const results = await runAllTests(pages, 30);
    
    // Log overall success/failure
    const allPassed = Object.values(results).every(result => result === true);
    
    if (allPassed) {
      console.log('\n✅ All rendering mode tests passed!');
    } else {
      console.log('\n❌ Some rendering mode tests failed.');
      console.log('Please check your Next.js configuration and page implementations.');
    }
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

// Run the tests
runTests();
