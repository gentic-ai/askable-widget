# Vercel CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Vercel.

## Method 1: Using vercel.json (Recommended)

Create or update `vercel.json` in your project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
        }
      ]
    }
  ]
}
```

## Method 2: Using Next.js Headers API (Next.js 13+)

In your `next.config.js`:

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

## Method 3: Using Middleware (Next.js 12+)

Create `middleware.ts` in your project root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
  
  return response;
}

export const config = {
  matcher: '/:path*'
};
```

## Strict CSP (Recommended for Production)

For stricter security, use nonce-based CSP:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "script-src 'self' https://askable.gentic.in  'nonce-{NONCE}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
        }
      ]
    }
  ]
}
```

**Note:** When using nonce-based CSP, you'll need to generate and inject nonces in your HTML. This requires server-side rendering support.

## Testing

After deploying, verify CSP headers are set correctly:

```bash
curl -I https://your-domain.vercel.app
```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Widget Not Loading

1. Check browser console for CSP violations
2. Verify CSP headers are correctly set
3. Ensure all required directives are included

### CSP Violations

If you see CSP violations:
1. Check the violation report in browser console
2. Add the required source to the appropriate directive
3. Redeploy and test again
