/**
 * Next.js App Router Example
 * 
 * This example shows how to integrate the Askable widget in a Next.js App Router application.
 * 
 * Place this component in your app directory, e.g., app/layout.tsx or app/page.tsx
 */

'use client';

import { useEffect } from 'react';

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

interface AskableWidgetProps {
  siteId: string;
  apiBaseUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language?: string;
  autoOpen?: boolean;
  autoOpenDelayMs?: number;
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
    // Load the Askable widget script
    const loadWidget = async () => {
      const script = document.createElement('script');
      script.src = 'https://askable.gentic.in/versions/latest/askable-ws.js';
      script.async = true;
      script.setAttribute('data-site-id', siteId);
      script.setAttribute('data-widget-type', 'ws');
      
      // Optional: Fetch and set SRI hash for enhanced security
      try {
        const sriResponse = await fetch('https://askable.gentic.in/versions/latest/sri-hashes.json');
        const sriData = await sriResponse.json();
        const hash = sriData['askable-ws.js']?.hash;
        if (hash) {
          script.integrity = hash;
          script.crossOrigin = 'anonymous';
        }
      } catch (error) {
        console.warn('Failed to fetch SRI hash, loading widget without SRI:', error);
      }
      
      if (apiBaseUrl) {
        script.setAttribute('data-api-base-url', apiBaseUrl);
      }
      if (position) {
        script.setAttribute('data-position', position);
      }
      if (language) {
        script.setAttribute('data-language', language);
      }
      if (autoOpen) {
        script.setAttribute('data-auto-open', 'true');
        if (autoOpenDelayMs) {
          script.setAttribute('data-auto-open-delay', autoOpenDelayMs.toString());
        }
      }

      };

    loadWidget();

    // Cleanup function
    return () => {
      // Remove script tag
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
  }, [siteId, apiBaseUrl, position, language, autoOpen, autoOpenDelayMs]);

  return null; // Widget renders itself
}

/**
 * Usage Example:
 * 
 * In your app/page.tsx or app/layout.tsx:
 * 
 * import AskableWidget from '@/components/AskableWidget';
 * 
 * export default function HomePage() {
 *   return (
 *     <div>
 *       <h1>My Next.js App</h1>
 *       <AskableWidget 
 *         siteId="your-site-id"
 *         position="bottom-right"
 *         language="en"
 *       />
 *     </div>
 *   );
 * }
 */
