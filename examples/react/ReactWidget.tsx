/**
 * React Component Example
 * 
 * This example shows how to integrate the Askable widget in a React application.
 */

import { useEffect } from 'react';

interface AskableWidgetProps {
  siteId: string;
  apiBaseUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language?: string;
  autoOpen?: boolean;
  autoOpenDelayMs?: number;
}

declare global {
  interface Window {
    initAskableWSWidget?: (config: {
      siteId: string;
      apiBaseUrl?: string;
      position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
      language?: string;
      autoOpen?: boolean;
      autoOpenDelayMs?: number;
    }) => {
      openAndStart: () => void;
      destroy: () => void;
    };
    askableWSWidget?: {
      openAndStart: () => void;
      destroy: () => void;
    };
  }
}

export default function AskableWidget({
  siteId,
  apiBaseUrl,
  position = 'bottom-right',
  language = 'en',
  autoOpen = false,
  autoOpenDelayMs,
}: AskableWidgetProps) {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://askable.gentic.in/versions/latest/askable-ws.js"]'
    );

    if (existingScript) {
      // Script already loaded, initialize widget
      if (window.initAskableWSWidget) {
        window.askableWSWidget = window.initAskableWSWidget({
          siteId,
          apiBaseUrl,
          position,
          language,
          autoOpen,
          autoOpenDelayMs,
        });
      }
      return;
    }

    // Load the Askable widget script
    const script = document.createElement('script');
    script.src = 'https://askable.gentic.in/versions/latest/askable-ws.js';
    script.async = true;
    script.onload = () => {
      // Initialize widget after script loads
      if (window.initAskableWSWidget) {
        window.askableWSWidget = window.initAskableWSWidget({
          siteId,
          apiBaseUrl,
          position,
          language,
          autoOpen,
          autoOpenDelayMs,
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Destroy widget instance if it exists
      if (window.askableWSWidget) {
        window.askableWSWidget.destroy();
        window.askableWSWidget = undefined;
      }
    };
  }, [siteId, apiBaseUrl, position, language, autoOpen, autoOpenDelayMs]);

  return null; // Widget renders itself
}

/**
 * Usage Example:
 * 
 * import AskableWidget from './components/AskableWidget';
 * 
 * function App() {
 *   return (
 *     <div className="App">
 *       <h1>My React App</h1>
 *       <AskableWidget 
 *         siteId="your-site-id"
 *         position="bottom-right"
 *         language="en"
 *       />
 *     </div>
 *   );
 * }
 */
