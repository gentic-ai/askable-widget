# Netlify CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Netlify.

## Method 1: Using _headers file (Recommended)

Create a `_headers` file in your `public` directory (or `dist` directory for static sites):

```
/*
  Content-Security-Policy: script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;
```

## Method 2: Using netlify.toml

Create or update `netlify.toml` in your project root:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
```

## Method 3: Using Netlify Functions

Create a Netlify function to add headers:

Create `netlify/functions/add-headers.js`:

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Security-Policy': "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    },
    body: JSON.stringify({ message: 'Headers added' })
  };
};
```

## Method 4: Using Next.js on Netlify

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

## Method 5: Using Netlify Edge Functions

Create `netlify/edge-functions/add-csp-headers.ts`:

```typescript
export default async (request: Request) => {
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
};
```

Add to `netlify.toml`:

```toml
[[edge_functions]]
  function = "add-csp-headers"
  path = "/*"
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
curl -I https://your-site.netlify.app
```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Widget Not Loading

1. Check browser console for CSP violations
2. Verify `_headers` file is in `public` directory
3. Check Netlify deploy logs for errors

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Redeploy and test

### _headers File Not Working

1. Ensure file is named exactly `_headers` (case-sensitive)
2. Place in `public` directory (or `dist` for static sites)
3. Check Netlify build logs
4. Verify file is included in deploy output
