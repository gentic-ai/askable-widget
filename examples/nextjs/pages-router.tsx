/**
 * Next.js Pages Router Example
 * 
 * This example shows how to integrate the Askable widget in a Next.js Pages Router application.
 * 
 * Option 1: Using _app.tsx (recommended for global widget)
 * Option 2: Using individual pages
 */

import { useEffect } from 'react';
import Head from 'next/head';

/**
 * Option 1: Add to _app.tsx for global widget
 * 
 * import AskableWidget from '../components/AskableWidget';
 * 
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <>
 *       <Component {...pageProps} />
 *       <AskableWidget siteId="your-site-id" />
 *     </>
 *   );
 * }
 */

/**
 * Option 2: Add to individual pages
 */
export default function HomePage() {
  useEffect(() => {
    // Load the Askable widget script
    const script = document.createElement('script');
    script.src = 'https://askable.gentic.in/versions/latest/askable-ws.js';
    script.async = true;
    script.setAttribute('data-site-id', 'YOUR_SITE_ID'); // Replace with your site ID
    script.setAttribute('data-widget-type', 'ws');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-language', 'en');

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://askable.gentic.in/versions/latest/askable-ws.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Destroy widget instance if it exists
      if (window.askableWSWidget) {
        window.askableWSWidget.destroy();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <div>
        <h1>Welcome to My Next.js App</h1>
        <p>The Askable widget is loaded and will appear in the bottom-right corner.</p>
      </div>
    </>
  );
}

/**
 * Option 3: Using Script component (Next.js 11+)
 * 
 * import Script from 'next/script';
 * 
 * export default function HomePage() {
 *   return (
 *     <>
 *       <h1>Welcome</h1>
 *       <Script
 *         src="https://askable.gentic.in/versions/latest/askable-ws.js"
 *         strategy="afterInteractive"
 *         data-site-id="YOUR_SITE_ID"
 *         data-widget-type="ws"
 *         data-position="bottom-right"
 *         data-language="en"
 *       />
 *     </>
 *   );
 * }
 */
