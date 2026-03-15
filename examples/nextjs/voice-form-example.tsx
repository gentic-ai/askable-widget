/**
 * Next.js App Router – Voice Form Example (script-tag only)
 *
 * This example shows:
 * - A normal React form in App Router
 * - A <script> tag that attaches the Askable voice widget to that form
 *
 * The key part is the script tag with data-form-id pointing at your form’s id.
 *
 * Files:
 * - app/page.tsx (or any route): your form
 * - app/layout.tsx: the Askable <script> tag before </body>
 */

// app/page.tsx
export default function VoiceFormPage() {
    return (
      <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <h1>Request a demo</h1>
        <p>Users can fill this form by voice once the Askable script is loaded.</p>
  
        <form
          id="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            console.log('Form submitted:', data);
            alert(`Form submitted!\n\n${JSON.stringify(data, null, 2)}`);
          }}
          style={{ display: 'grid', gap: 12, marginTop: 16 }}
        >
          <input name="firstName" placeholder="Name" required />
          <input name="email" type="email" placeholder="Work email" required />
          <input name="company" placeholder="Company (optional)" />
          <button type="submit">Submit</button>
        </form>
  
        <div
          id="askable-embed-container"
          style={{ marginTop: 24, minHeight: 120 }}
        />
      </main>
    );
  }
  
  /**
   * app/layout.tsx
   *
   * Attach the voice agent to the existing form via a script tag.
   * Place this just before </body>.
   *
   * export default function RootLayout({ children }: { children: React.ReactNode }) {
   *   return (
   *     <html lang="en">
   *       <body>
   *         {children}
   *         <script
   *           src="https://askable.gentic.in/versions/latest/askable-ws.js"
   *           data-site-id="YOUR_SITE_ID"
   *           data-widget-type="ws"
   *           data-embed="true"
   *           data-embed-container="#askable-embed-container"
   *           data-form-id="contact-form"
   *           data-label="Fill form by voice"
   *         ></script>
   *       </body>
   *     </html>
   *   );
   * }
   */