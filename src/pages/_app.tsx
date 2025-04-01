import type { AppProps } from 'next/app';
import { useEffect } from 'react'; // Import useEffect
import useStore from '@/store'; // Import the Zustand store hook
import '../styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider

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

  // Wrap everything with ThemeProvider
  return (
    <ThemeProvider
      attribute="class" // Use class strategy (adds .dark/.light to html tag)
      defaultTheme="system" // Default to system preference
      enableSystem // Enable system preference detection
      disableTransitionOnChange // Optional: Prevent transitions on theme change
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
