import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useStore from '@/store'; // Import the Zustand store hook

const DashboardPage: React.FC = () => {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state) => state.isLoading);
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isLoading && !user) {
      console.log('User not authenticated, redirecting to login...');
      router.replace('/login'); // Use replace to avoid adding dashboard to history
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading || !user) {
    // Render null or a loading spinner while redirecting or confirming auth
    // Avoid rendering the dashboard content prematurely
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>Loading or Redirecting...</div>
        </div>
    );
  }

  // Render dashboard content only if authenticated
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      <p>This is your protected dashboard area.</p>
      {/* Add dashboard widgets and content here */}
    </div>
  );
};

export default DashboardPage;