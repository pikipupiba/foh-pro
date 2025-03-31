import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global styles
import MainLayout from '../components/layout/MainLayout'; // Import the MainLayout

function MyApp({ Component, pageProps }: AppProps) {
  // Wrap the Component with MainLayout
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
