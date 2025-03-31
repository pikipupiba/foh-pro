import type { AppProps } from 'next/app';
import { useEffect } from 'react'; // Import useEffect
import useStore from '@/store'; // Import the Zustand store hook
import '../styles/globals.css'; // Import global styles
import MainLayout from '@/components/layout/MainLayout'; // Use path alias for consistency

function MyApp({ Component, pageProps }: AppProps) {
  // Get actions from the Zustand store
  const initializeAuthListener = useStore((state) => state.initializeAuthListener);
  const cleanupAuthListener = useStore((state) => state.cleanupAuthListener);

  // Initialize the auth listener on component mount
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    // Clean up the listener when the app unmounts
    return () => {
      cleanupAuthListener();
    };
    // Run only once on mount
  }, [initializeAuthListener, cleanupAuthListener]);

  // Wrap the Component with MainLayout
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
