# Askable Widget Documentation

Add voice AI to your website in minutes with the Askable WebSocket Widget.

## Quick Start

Add the Askable widget to your website by including this script tag before the closing `</body>` tag:

```html
<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
></script>
```

Replace `YOUR_SITE_ID` with your actual site ID from your Askable dashboard.

That's it! The widget will automatically appear in the bottom-right corner of your page.

## Installation

### Basic Installation

The simplest way to add Askable to your website is using the script tag method:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  
  <!-- Your website content -->
  
  <!-- Askable Widget -->
  <script
    src="https://askable.gentic.in/versions/latest/askable-ws.js"
    data-site-id="YOUR_SITE_ID"
    data-widget-type="ws"
  ></script>
</body>
</html>
```

### Using a Specific Version

For production deployments, we recommend pinning to a specific version:

```html
<script
  src="https://askable.gentic.in/versions/v1.0.0/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
></script>
```

### CDN URL Format

The widget is available via CDN at:

- **Latest version**: `https://askable.gentic.in/versions/latest/askable-ws.js`
- **Specific version**: `https://askable.gentic.in/versions/v1.0.0/askable-ws.js`

Replace `v1.0.0` with your desired version number.

### Using Subresource Integrity (SRI)

For enhanced security, use Subresource Integrity (SRI) hashes to verify the script hasn't been tampered with:

```html
<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  integrity="sha384-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  crossorigin="anonymous"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
></script>
```

**Important**: Always include `crossorigin="anonymous"` when using SRI.

#### Finding SRI Hashes

SRI hashes are available for each version:

1. **Via API endpoint**: 
   - Latest: `https://askable.gentic.in/versions/latest/sri-hashes.json`
   - Specific version: `https://askable.gentic.in/versions/v1.0.0/sri-hashes.json`

2. **Response format**:
   ```json
   {
     "askable-ws.js": {
       "hash": "sha384-NWgAiH06DW/PwL5bL8jd6u0w5QwaB8YW/8mxwjNtZp7h3GFsp6mxqfB4CsTevOC4",
       "algorithm": "sha384",
       "size": 207653,
       "lastModified": "2026-01-22T10:45:53.409Z"
     }
   }
   ```

3. **Programmatic access**:
   ```javascript
   // Fetch hash for latest version
   const response = await fetch('https://askable.gentic.in/versions/latest/sri-hashes.json');
   const data = await response.json();
   const hash = data['askable-ws.js'].hash;
   ```

#### Why Use SRI?

- **Tampering Prevention**: Prevents attackers from modifying the script in transit
- **CDN Security**: Protects against compromised CDNs
- **Man-in-the-Middle Protection**: Detects MITM attacks that modify scripts
- **Supply Chain Security**: Ensures the script hasn't been tampered with

**Note**: If you update to a new version, you must update the `integrity` hash, otherwise the browser will reject the script.

## Configuration Options

### Script Tag Attributes

Configure the widget using data attributes on the script tag:

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-site-id` | Yes | - | Your Askable site/agent ID |
| `data-widget-type` | Yes | - | Must be `"ws"` for WebSocket widget |
| `data-api-base-url` | No | Current origin | API endpoint URL (if different from current domain) |
| `data-position` | No | `bottom-right` | Widget position: `bottom-right`, `bottom-left`, `top-right`, `top-left` |
| `data-language` | No | `en` | Language code (e.g., `en`, `hi`, `ta`, `es`, `fr`) |
| `data-auto-open` | No | `false` | Auto-open widget after page load |
| `data-auto-open-delay` | No | `0` | Delay in milliseconds before auto-opening |

### Example with All Options

```html
<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="my-agent-123"
  data-widget-type="ws"
  data-api-base-url="https://api.example.com"
  data-position="bottom-left"
  data-language="en"
  data-auto-open="true"
  data-auto-open-delay="3000"
></script>
```

## Programmatic Initialization

You can also initialize the widget programmatically using JavaScript:

```html
<script src="https://askable.gentic.in/versions/latest/askable-ws.js"></script>
<script>
  const widget = window.initAskableWSWidget({
    siteId: 'YOUR_SITE_ID',
    apiBaseUrl: 'https://api.example.com', // Optional
    position: 'bottom-right', // Optional: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    language: 'en', // Optional: language code
    autoOpen: true, // Optional: auto-open widget
    autoOpenDelayMs: 3000 // Optional: delay before auto-opening
  });
  
  // Later, you can destroy the widget
  // widget.destroy();
</script>
```

## Advanced Configuration

### Custom API Base URL

If your API is hosted on a different domain, specify the base URL:

```html
<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
  data-api-base-url="https://api.yourdomain.com"
></script>
```

### Widget Positioning

Control where the widget appears on your page:

```html
<!-- Bottom right (default) -->
<script data-position="bottom-right" ...></script>

<!-- Bottom left -->
<script data-position="bottom-left" ...></script>

<!-- Top right -->
<script data-position="top-right" ...></script>

<!-- Top left -->
<script data-position="top-left" ...></script>
```

### Language Support

Set the widget language:

```html
<script data-language="en" ...></script> <!-- English -->
<script data-language="hi" ...></script> <!-- Hindi -->
<script data-language="ta" ...></script> <!-- Tamil -->
<script data-language="es" ...></script> <!-- Spanish -->
<script data-language="fr" ...></script> <!-- French -->
```

### Auto-Open Behavior

Automatically start the voice session when the page loads:

```html
<!-- Auto-open immediately -->
<script data-auto-open="true" ...></script>

<!-- Auto-open after 3 seconds -->
<script data-auto-open="true" data-auto-open-delay="3000" ...></script>
```

### Connection Timeout Configuration

Configure the WebSocket connection timeout (default: 30 seconds):

```html
<script>
  // Set timeout before loading the widget script
  window.__askableWsConnectionTimeout = 60000; // 60 seconds
</script>
<script src="https://askable.gentic.in/versions/latest/askable-ws.js" ...></script>
```

### Public API Methods

After initialization, the widget instance is available at `window.askableWSWidget`:

```javascript
// Open widget and start voice session programmatically
window.askableWSWidget.openAndStart();

// Destroy the widget
window.askableWSWidget.destroy();
```

## Examples

### Basic HTML Page

See [`examples/html/basic.html`](./examples/html/basic.html) for a complete example.

### HTML with SRI (Subresource Integrity)

See [`examples/html/with-sri.html`](./examples/html/with-sri.html) for an example using SRI hashes for enhanced security.

### Next.js App Router

See [`examples/nextjs/app-router.tsx`](./examples/nextjs/app-router.tsx) for Next.js App Router integration.

### Next.js Pages Router

See [`examples/nextjs/pages-router.tsx`](./examples/nextjs/pages-router.tsx) for Next.js Pages Router integration.

### React

See [`examples/react/ReactWidget.tsx`](./examples/react/ReactWidget.tsx) for React component integration.

### Vue

See [`examples/vue/VueWidget.vue`](./examples/vue/VueWidget.vue) for Vue component integration.

### Vercel Deployment

See [`examples/vercel/vercel.json`](./examples/vercel/vercel.json) for Vercel-specific configuration.

## Content Security Policy (CSP) Configuration

The Askable widget requires specific CSP directives to function properly. Configure your CSP headers based on your deployment platform.

### Required CSP Directives

```http
Content-Security-Policy: 
  script-src 'self' https://askable.gentic.in;
  connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in;
  media-src 'self' blob:;
  worker-src 'self' blob:;
  child-src 'self' blob:;
```

**Note:** The widget itself doesn't require `unsafe-inline` or `unsafe-eval`. However, if your website uses inline scripts or `eval()`, you may need to add these directives. For better security, consider using nonces or hashes for inline scripts instead.

### About `blob:` URLs in CSP

The widget uses `blob:` URLs for:
- **`worker-src blob:`** - **REQUIRED** - AudioWorklet processor is loaded from a blob URL created from inline code
- **`media-src blob:`** - Audio playback buffers created from WebSocket audio data (may be required by some browsers)
- **`child-src blob:`** - Browser-internal audio processing contexts (may be required by some browsers)

**Security Considerations:**

1. **`blob:` is NOT used for scripts** - The widget never loads scripts from blob URLs. However, the AudioWorklet processor code is embedded inline and loaded via a blob URL.

2. **Risk level by directive:**
   - **`script-src blob:`** - ❌ **HIGH RISK** - Never allow this. Blob URLs inherit your origin and can execute arbitrary code.
   - **`worker-src blob:`** - ⚠️ **REQUIRED** - The widget creates the AudioWorklet processor code inline and loads it via `URL.createObjectURL(new Blob([...code...]))`. This requires `blob:` in `worker-src`.
   - **`media-src blob:`** - ⚠️ **MODERATE RISK** - May be required for audio playback. Blob URLs are created by the browser for MediaStream and AudioBuffer objects.
   - **`child-src blob:`** - ⚠️ **MODERATE RISK** - May be needed for iframes or workers created by the browser.

3. **Why it's relatively safe for this widget:**
   - The widget doesn't create blob URLs from user input
   - AudioWorklet code is embedded in the widget script (not user-controlled)
   - Audio buffers are created from WebSocket data (server-controlled)
   - No script execution from blob URLs (only worker code)

4. **Required CSP directives:**
   - ✅ **`worker-src blob:`** - **MANDATORY** - Required for AudioWorklet to function
   - ✅ **`media-src blob:`** - **RECOMMENDED** - Required for audio playback in most browsers
   - ✅ **`child-src blob:`** - **RECOMMENDED** - May be required for browser-internal contexts
   - ❌ **`script-src blob:`** - **NEVER ALLOW** - This would be a security risk

**Note:** The widget will not function without `worker-src blob:` as the AudioWorklet processor must be loaded from a blob URL.

### Platform-Specific CSP Configuration

#### Vercel

See [`csp-configs/vercel.md`](./csp-configs/vercel.md) for Vercel CSP configuration.

#### Cloudflare Pages

See [`csp-configs/cloudflare.md`](./csp-configs/cloudflare.md) for Cloudflare Pages CSP configuration.

#### Netlify

See [`csp-configs/netlify.md`](./csp-configs/netlify.md) for Netlify CSP configuration.

#### Deno Deploy

See [`csp-configs/deno.md`](./csp-configs/deno.md) for Deno Deploy CSP configuration.

#### Nginx

See [`csp-configs/nginx.md`](./csp-configs/nginx.md) for Nginx CSP configuration.

#### Apache

See [`csp-configs/apache.md`](./csp-configs/apache.md) for Apache CSP configuration.

#### Express.js / Node.js

See [`csp-configs/express.md`](./csp-configs/express.md) for Express.js CSP configuration.

## Browser Support

The Askable widget supports all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Requirements:**
- HTTPS (required for microphone access)
- WebSocket support
- AudioWorklet support (for audio processing)

## Troubleshooting

### Widget Not Appearing

1. **Check browser console** for errors
2. **Verify site ID** is correct
3. **Ensure HTTPS** is enabled (required for microphone access)
4. **Check CSP headers** allow the widget script and connections

### Microphone Not Working

1. **Check browser permissions** - ensure microphone access is granted
2. **Verify HTTPS** - microphone access requires secure context
3. **Check browser console** for permission errors

### Connection Issues

1. **Check network connectivity**
2. **Verify API base URL** is correct
3. **Check WebSocket support** in browser
4. **Review CSP headers** - ensure `connect-src` allows WebSocket connections

### CSP Violations

If you see CSP violations in the console:

1. **Review CSP configuration** for your platform (see CSP Configs section)
2. **Ensure all required directives** are included, especially `worker-src blob:` which is mandatory
3. **Check for conflicting CSP headers** from other sources
4. **Verify blob: URLs are allowed** - The widget requires `worker-src blob:` for AudioWorklet to function

### SRI Hash Mismatch

If you see errors like "Failed to find a valid digest in the 'integrity' attribute":

1. **Verify the hash** matches the current script version
2. **Fetch the latest hash** from `https://askable.gentic.in/versions/latest/sri-hashes.json`
3. **Ensure `crossorigin="anonymous"`** is set on the script tag
4. **Check version mismatch** - if using a specific version, ensure the hash matches that version
5. **CDN modifications** - Some CDNs may modify scripts (minification, compression) which breaks SRI. Ensure your CDN serves the exact file

## API Reference

### Widget Configuration Interface

```typescript
interface AskableWidgetConfig {
  siteId: string;                    // Required: Your site/agent ID
  apiBaseUrl?: string;                // Optional: API endpoint URL
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language?: string;                  // Optional: Language code
  autoOpen?: boolean;                 // Optional: Auto-open widget
  autoOpenDelayMs?: number;           // Optional: Delay before auto-opening
}
```

### Widget Instance Methods

```typescript
class AskableWSWidget {
  // Open widget and start voice session
  openAndStart(): void;
  
  // Destroy widget instance
  destroy(): void;
}
```

## Security Considerations

1. **HTTPS Required**: The widget requires HTTPS for microphone access
2. **Domain Validation**: Configure allowed domains in your Askable dashboard
3. **CSP Headers**: Implement proper CSP headers to prevent XSS attacks
4. **SRI Hashes**: Use Subresource Integrity (SRI) hashes to verify script integrity (see [SRI section](#using-subresource-integrity-sri) above)
5. **Blob URLs**: The widget requires `blob:` URLs for AudioWorklet (`worker-src blob:` is mandatory). It also uses `blob:` for audio playback (`media-src`). Never allow `blob:` in `script-src` (see [CSP blob: section](#about-blob-urls-in-csp) above)
6. **API Keys**: API keys are handled server-side - never expose them in client code

## Support

For issues, questions, or feature requests:

- **Documentation**: [https://docs.askable.gentic.in](https://docs.askable.gentic.in)
- **Support**: [support@askable.gentic.in](mailto:support@askable.gentic.in)
- **GitHub Issues**: [https://github.com/askable/widget-docs/issues](https://github.com/askable/widget-docs/issues)

## License

Copyright © 2026 Askable. All rights reserved.
