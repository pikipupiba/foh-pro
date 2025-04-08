import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Server-Side Rendering Test',
  'Testing Server-Side Rendering (SSR) in Next.js'
);

export default function TestSSRPage() {
  // This function runs on the server for every request
  const currentTime = new Date().toISOString();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Server-Side Rendering (SSR) Test</h1>
      <p className="mb-4">
        This page is using Server-Side Rendering. The content is generated on the server for each request.
      </p>
      <div className="p-4 bg-gray-800 rounded-md">
        <p className="text-white">
          <strong>Page generated at:</strong> {currentTime}
        </p>
        <p className="text-white mt-2">
          <strong>Note:</strong> This timestamp will update on every page refresh because the page is rendered on the server for each request.
        </p>
      </div>
    </div>
  );
}
