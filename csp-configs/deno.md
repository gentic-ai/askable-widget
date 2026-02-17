# Deno Deploy CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Deno Deploy.

## Method 1: Using Deno.serve (Deno 1.25+)

```typescript
Deno.serve((req) => {
  const response = new Response('Your HTML content', {
    headers: {
      'Content-Type': 'text/html',
      'Content-Security-Policy': "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    }
  });
  
  return response;
});
```

## Method 2: Using Fresh Framework

In your Fresh route handler or middleware:

```typescript
import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My App</title>
</head>
<body>
  <h1>Hello World</h1>
  <script src="https://askable.gentic.in/versions/latest/askable-ws.js" 
          data-site-id="YOUR_SITE_ID" 
          data-widget-type="ws"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Security-Policy': "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    }
  });
};
```

## Method 3: Using Middleware

Create `_middleware.ts`:

```typescript
export function handler(req: Request): Response {
  const response = new Response(req.body, {
    status: 200,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      'Content-Security-Policy': "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    }
  });
  
  return response;
}
```

## Method 4: Using Oak Framework

```typescript
import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  ctx.response.headers.set(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
});

app.use((ctx) => {
  ctx.response.body = "Hello World";
});

await app.listen({ port: 8000 });
```

## Method 5: Using Hono Framework

```typescript
import { Hono } from "https://deno.land/x/hono@v3.11.7/mod.ts";

const app = new Hono();

app.use('*', async (c, next) => {
  await next();
  c.header(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
});

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My App</title>
    </head>
    <body>
      <h1>Hello World</h1>
      <script src="https://askable.gentic.in/versions/latest/askable-ws.js" 
              data-site-id="YOUR_SITE_ID" 
              data-widget-type="ws"></script>
    </body>
    </html>
  `);
});

Deno.serve(app.fetch);
```

## Strict CSP (Recommended for Production)

For stricter security, use nonce-based CSP:

```typescript
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts";

// Generate nonce
const nonce = crypto.randomUUID().replace(/-/g, '');

const csp = `script-src 'self' https://askable.gentic.in  'nonce-${nonce}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;`;

// Inject nonce into script tags in your HTML
const html = htmlTemplate.replace(
  '<script',
  `<script nonce="${nonce}"`
);
```

## Testing

After deploying, verify CSP headers:

```bash
curl -I https://your-project.deno.dev
```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Widget Not Loading

1. Check browser console for CSP violations
2. Verify headers are correctly set in your handler
3. Ensure all required directives are included

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Redeploy and test

### Headers Not Applied

1. Ensure headers are set before sending response
2. Check middleware order (headers middleware should run before route handlers)
3. Verify response is not being modified after headers are set
