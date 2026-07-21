# Askable Widget Documentation

Add text and voice AI agents to your website in minutes with Askable widgets. Use `askable-ws-multi` for text-first agents with optional voice, attachments, workflow updates, screen share and live video, or use `askable-ws` for voice-first experiences and embeddable voice forms.

## Quick Start

Add the Askable voice widget to your website by including this script tag before the closing `</body>` tag:

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
| `data-embed` | No | `false` | When `"true"`, render the widget inline inside a container instead of as a floating corner widget |
| `data-embed-container` | No | `auto` | CSS selector for the container to render into when `data-embed="true"`; `"auto"` uses a reasonable default near the script tag |
| `data-form-id` | No | - | **Embed Voice Forms:** Form ID or CSS selector (e.g. `contact-form` or `#contact-form`) to attach the widget to. When set, the agent collects the form’s fields by voice and fills them live; when done, it submits the form. See [Embed Voice Forms](#embed-voice-forms). |
| `data-size` | No | `medium` | Mic button size: `small`, `medium`, or `large` (see [Theme & customization](#theme--customization-v020)) |
| `data-label` | No | `Start voice` | Accessible label (and optional visible label) for the mic button |
| `data-theme` | No | - | Theme hint for widget styling (e.g. `light`, `dark`, `auto`) |

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
  data-embed="false"
  data-size="medium"
  data-label="Talk to our AI agent"
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

## Text Agents (`askable-ws-multi`)

Use `askable-ws-multi` to add a text-first AI agent to your website. The widget supports streamed text responses, optional voice mode, file attachments, workflow progress, panel and floating-chat layouts, themes, and resumable sessions.

### Quick Start

Add the script before the closing `</body>` tag:

```html
<script
  src="https://askable.gentic.in/askable-ws-multi.js"
  data-widget="askable-ws-multi"
  data-site-id="YOUR_SITE_ID"
  data-api-base-url="https://askable.gentic.in"
  data-layout="panel"
  data-interaction-mode="text"
  data-embed="false"
  data-start-collapsed="true"
></script>
```

Replace `YOUR_SITE_ID` with your site or agent ID from the Askable dashboard. This example starts as a floating chat button and opens the text agent when selected.

### Script Tag Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-widget` | Yes | - | Must be `askable-ws-multi` |
| `data-site-id` | Yes | - | Your Askable site or agent ID |
| `data-api-base-url` | No | Current origin | Askable API origin |
| `data-language` | No | `en` | Agent language code |
| `data-layout` | No | `panel` | `panel` or `chat` |
| `data-interaction-mode` | No | `text` | Initial mode: `text` or `voice` |
| `data-embed` | No | `false` | `true` creates a desktop split pane; `false` uses an overlay |
| `data-embed-container` | No | Auto-created | CSS selector for a custom embed container |
| `data-start-collapsed` | No | Responsive | `true` starts with only the floating chat button |
| `data-panel-top-offset` | No | `0` | Top offset in pixels for an overlay panel |
| `data-theme` | No | `dashboard` | `shadcn`, `material`, `dashboard`, `modern`, or `custom` |
| `data-custom-css` | No | - | CSS overrides applied inside the widget |
| `data-enable-live-video` | No | `false` | Enables camera and screen-sharing controls |

### Layouts and Mobile Behavior

For the most reliable floating widget across desktop and mobile, use:

```html
data-embed="false"
data-start-collapsed="true"
```

This avoids changing the host page layout and starts with a chat button. Expanding the widget opens a docked panel on larger screens and a full-screen panel on smaller screens.

For a side-by-side desktop layout, use `data-embed="true"`. Askable then wraps the page content and creates a panel column on the right. Use this only when the host page should participate in the split layout.

To use the floating chat window instead of the panel layout:

```html
<script
  src="https://askable.gentic.in/askable-ws-multi.js"
  data-widget="askable-ws-multi"
  data-site-id="YOUR_SITE_ID"
  data-api-base-url="https://askable.gentic.in"
  data-layout="chat"
  data-interaction-mode="text"
  data-embed="false"
></script>
```

### Programmatic Initialization

Load the bundle and initialize the widget manually when its configuration depends on your application state:

```html
<script src="https://askable.gentic.in/askable-ws-multi.js"></script>
<script>
  const widget = window.initAskableWSMultiWidget({
    siteId: 'YOUR_SITE_ID',
    apiBaseUrl: 'https://askable.gentic.in',
    layout: 'panel',
    defaultInteractionMode: 'text',
    embed: false,
    startCollapsed: true,
    themeId: 'dashboard'
  });

  widget.init();

  // Later:
  // widget.destroy();
</script>
```

### Capabilities

- **Text and voice:** Visitors can switch between text and voice modes when enabled.
- **Attachments:** JPEG, PNG, WebP, WAV, MP3, WebM, and MP4 files up to 20 MB.
- **Workflow status:** Displays progress from agent tools and workflows.
- **Live video:** Optional camera or screen sharing with `data-enable-live-video="true"`.
- **Session resume:** Idle sessions can reconnect and resume when the agent session policy permits it.
- **Themes:** Preset themes use Askable design tokens; `custom` supports operator-provided CSS.

### Domain and Security Requirements

- Add every host origin that embeds the widget to the agent's `allowedDomains`.
- Serve the host page over HTTPS when using voice, camera, or screen sharing.
- Allow `https://askable.gentic.in` in `script-src` and `connect-src`.
- Allow `wss://askable.gentic.in` in `connect-src`.

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

### Theme & Customization (v0.2.0)

The WebSocket widget supports **script-level** and **agent-level** customization so you can align the widget with your brand and page layout.

**Script attributes (per page):**

- **`data-size`** — Mic button size: `small`, `medium`, or `large`. Use a smaller size on dense layouts and a larger one for hero or CTA sections.
- **`data-label`** — Accessible label and optional visible text for the mic button (e.g. "Talk to our AI", "Fill form by voice").
- **`data-theme`** — Optional theme hint (e.g. `light`, `dark`, `auto`) for status text and background styling.

**Agent-level (Askable dashboard):**

When you configure your agent in the Askable dashboard, you can set:

- **Primary color** — Used for the mic button and accent (e.g. brand color). The widget receives this via the voice proxy and applies it automatically.
- **Status texts** — Custom copy for each state: idle ("Click to speak"), connecting, listening, speaking, timeout, submitting, done. Configure these in the agent's `configuration.widgetUi.statusTexts` so the same agent shows consistent, branded copy across all sites that embed it.

Example script tag with customization:

```html
<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
  data-size="large"
  data-label="Talk to our AI"
  data-theme="light"
></script>
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

### Voice Form (HTML)

See [`examples/html/voice-form.html`](./examples/html/voice-form.html) for a contact form with the widget in voice-form mode: users can fill and submit the form by speaking.

### Inline Embed (In-Page CTA)

To embed the widget directly inside a section of your page (for example, next to a lead form or in a hero card), use `data-embed="true"` and point `data-embed-container` to a DOM element:

```html
<div id="askable-embed-container"></div>

<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
  data-embed="true"
  data-embed-container="#askable-embed-container"
  data-language="en"
  data-size="medium"
  data-label="Talk to our AI agent"
></script>
```

In embed mode, the widget renders inline inside the chosen container and does not use floating/scroll-based behavior.

## Embed Voice Forms

Attach a voice agent to **any existing form** so users can fill and submit it by speaking. Add one script tag with `data-form-id` pointing to your form’s `id` (or CSS selector). Your form and submit handler stay unchanged.

**Requirements:** Give your form an `id` (e.g. `id="contact-form"`). Ensure each field in the form the agent should collect has a `name` attribute (`input`, `select`, `textarea`) and/or a `label` attribute.

### Attach with a script tag

Add the Askable script with **`data-form-id`** set to your form’s `id` or a CSS selector. Use **`data-embed="true"`** and **`data-embed-container`** to render the mic inline (e.g. next to the form), or omit them for the default floating widget.

```html
<!-- Your existing form (unchanged) -->
<form id="contact-form">
  <input type="text" name="firstName" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="company" placeholder="Company (optional)" />
  <button type="submit">Submit</button>
</form>

<!-- Container for the voice widget (when using inline embed) -->
<div id="askable-embed-container"></div>

<script
  src="https://askable.gentic.in/versions/latest/askable-ws.js"
  data-site-id="YOUR_SITE_ID"
  data-widget-type="ws"
  data-embed="true"
  data-embed-container="#askable-embed-container"
  data-form-id="contact-form"
  data-label="Fill form by voice"
></script>
```

Replace `YOUR_SITE_ID` with your Askable site ID. The agent will collect the form fields by voice, fill them live, and submit the form when done; your existing `submit` handler and validation run as usual.

**Full example:** [`examples/html/voice-form.html`](./examples/html/voice-form.html).

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

**For Best Performance (AudioWorklet - Recommended):**
```http
Content-Security-Policy: 
  script-src 'self' https://askable.gentic.in;
  connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in;
  worker-src 'self' https://askable.gentic.in;
```

**For Maximum Compatibility (ScriptProcessorNode Fallback):**
```http
Content-Security-Policy: 
  script-src 'self' https://askable.gentic.in;
  connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in;
```

**Note:** The widget itself doesn't require `unsafe-inline` or `unsafe-eval`. However, if your website uses inline scripts or `eval()`, you may need to add these directives. For better security, consider using nonces or hashes for inline scripts instead.

### Audio Processing Implementation (v0.2.0)

The widget uses a **hybrid approach** for audio processing:

1. **Primary Method (AudioWorklet)**: 
   - Uses `audio-processor.js` file (separate file, not blob URL)
   - Processes audio in a separate thread for better performance
   - Requires `worker-src` CSP directive
   - Automatically used when available and CSP allows it

2. **Fallback Method (ScriptProcessorNode)**:
   - Processes audio in main thread
   - No `worker-src` CSP directive required
   - Automatically used when AudioWorklet is unavailable or blocked by CSP
   - Maximum compatibility with strict CSP policies

**Benefits:**
- ✅ **No `blob:` URLs required** - Uses separate file instead of blob URLs
- ✅ **Better performance** - AudioWorklet runs in separate thread when available
- ✅ **Automatic fallback** - Works with strict CSP policies that cannot allow `worker-src`
- ✅ **Future-proof** - Uses modern API when possible, maintains compatibility

**Deployment:**
- Deploy `audio-processor.js` alongside widget script for best performance
- File should be accessible at `/audio-processor.js` or same path as widget script
- Widget works without processor file (uses ScriptProcessorNode fallback)

**Security Considerations:**

1. **No `blob:` URLs required** - The widget uses a separate file (`audio-processor.js`) instead of blob URLs, eliminating the need for `blob:` in CSP directives.

2. **`worker-src` directive:**
   - ✅ **Required for AudioWorklet** - If you want best performance, add `worker-src 'self' https://askable.gentic.in`
   - ✅ **Optional for compatibility** - Widget works without it (uses ScriptProcessorNode fallback)
   - ✅ **More secure than `blob:`** - Uses separate file instead of inline blob code

3. **CSP flexibility:**
   - Websites with strict CSP policies that cannot allow `worker-src` will automatically use ScriptProcessorNode
   - Websites that can allow `worker-src` will get better performance with AudioWorklet
   - No breaking changes - existing deployments continue to work

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
  apiBaseUrl?: string;               // Optional: API endpoint URL
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language?: string;                  // Optional: Language code
  autoOpen?: boolean;                 // Optional: Auto-open widget
  autoOpenDelayMs?: number;          // Optional: Delay before auto-opening
  // Embed mode configuration (inline CTA)
  embed?: boolean;                   // Optional: When true, render inline instead of as a floating widget
  embedContainer?: string;           // Optional: CSS selector for the container when embed=true
  // Embed Voice Forms: attach to a form and fill it by voice (live field updates + auto-submit when done)
  formId?: string;                   // Optional: Form id or CSS selector (e.g. "contact-form" or "#contact-form")
  // Theme & customization (v0.2.0)
  theme?: string;                    // Optional: Theme hint (e.g. "light", "dark", "auto")
  size?: 'small' | 'medium' | 'large'; // Optional: Mic button size preset
  label?: string;                    // Optional: Accessible label for the mic button
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

- **Support**: [dev-forum@askable.gentic.in](mailto:dev-forum@askable.gentic.in)
- **GitHub Issues**: [https://github.com/askable/widget-docs/issues](https://github.com/askable/widget-docs/issues)

## License

Copyright © 2026 Askable. All rights reserved.
