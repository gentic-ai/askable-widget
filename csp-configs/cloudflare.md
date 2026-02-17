# Cloudflare Pages CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Cloudflare Pages.

## Method 1: Using _headers file (Recommended)

Create a `_headers` file in your `public` directory (or root directory for static sites):

```
/*
  Content-Security-Policy: script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;
```

## Method 2: Using Cloudflare Workers

If you're using Cloudflare Workers, add headers in your worker script:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);
  
  const newHeaders = new Headers(response.headers);
  newHeaders.set(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
```

## Method 3: Using Cloudflare Transform Rules

1. Go to Cloudflare Dashboard → Rules → Transform Rules
2. Create a new "Modify Response Header" rule
3. Set:
   - **Rule name**: Add CSP Header
   - **When**: All requests
   - **Then**: Set header
     - **Header name**: `Content-Security-Policy`
     - **Value**: `script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;`

## Method 4: Using Next.js on Cloudflare Pages

If using Next.js, add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "script-src 'self' https://askable.gentic.in  ",
              "connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
              "child-src 'self' blob:"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

## Strict CSP (Recommended for Production)

For stricter security, use nonce-based CSP:

```
/*
  Content-Security-Policy: script-src 'self' https://askable.gentic.in  'nonce-{NONCE}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;
```

**Note:** When using nonce-based CSP, you'll need to generate and inject nonces in your HTML.

## Testing

After deploying, verify CSP headers:

```bash
curl -I https://your-domain.pages.dev
```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Widget Not Loading

1. Check browser console for CSP violations
2. Verify `_headers` file is in the correct location
3. Ensure file is deployed (check build output)

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Redeploy and test

### _headers File Not Working

1. Ensure file is named exactly `_headers` (case-sensitive)
2. Place in `public` directory for Next.js or root for static sites
3. Check Cloudflare Pages build logs for errors
