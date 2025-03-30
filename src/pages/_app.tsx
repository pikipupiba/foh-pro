import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  // Add any global layout components or context providers here if needed later
  return <Component {...pageProps} />;
}

export default MyApp;
