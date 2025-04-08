import { generateMetadata } from '../metadata';

export const metadata = generateMetadata(
  'Static Site Generation Test',
  'Testing Static Site Generation (SSG) in Next.js'
);

export default function TestSSGPage() {
  // This is a static page that will be generated at build time
  const currentTime = new Date().toISOString();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Static Site Generation (SSG) Test</h1>
      <p className="mb-4">
        This page is using Static Site Generation. The content is generated at build time.
      </p>
      <div className="p-4 bg-gray-800 rounded-md">
        <p className="text-white">
          <strong>Page generated at:</strong> {currentTime}
        </p>
        <p className="text-white mt-2">
          <strong>Note:</strong> This timestamp will only update when the site is rebuilt.
        </p>
      </div>
    </div>
  );
}
