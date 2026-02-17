# Express.js / Node.js CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget in Express.js applications.

## Method 1: Using helmet (Recommended)

Install helmet:

```bash
npm install helmet
```

Use in your Express app:

```javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': [
        "'self'",
        'https://askable.gentic.in'
      ],
      'connect-src': [
        "'self'",
        'https://askable.gentic.in',
        'wss://askable.gentic.in',
        'wss://*.askable.gentic.in'
      ],
      'media-src': ["'self'", 'blob:'],
      'worker-src': ["'self'", 'blob:'],
      'child-src': ["'self'", 'blob:']
    }
  }
}));

app.get('/', (req, res) => {
  res.send(`
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

app.listen(3000);
```

## Method 2: Manual Header Setting

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

## Method 3: Using express-csp-header

Install express-csp-header:

```bash
npm install express-csp-header
```

Use in your Express app:

```javascript
const express = require('express');
const { expressCspHeader } = require('express-csp-header');

const app = express();

app.use(expressCspHeader({
  directives: {
    'script-src': [
      "'self'",
      'https://askable.gentic.in'
    ],
    'connect-src': [
      "'self'",
      'https://askable.gentic.in',
      'wss://askable.gentic.in',
      'wss://*.askable.gentic.in'
    ],
    'media-src': ["'self'", 'blob:'],
    'worker-src': ["'self'", 'blob:'],
    'child-src': ["'self'", 'blob:']
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

## Method 4: Conditional CSP Based on Route

```javascript
const express = require('express');
const app = express();

// Apply CSP only to specific routes
app.use('/pages', (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
  );
  next();
});

app.get('/pages/home', (req, res) => {
  res.send('Home Page');
});

// API routes without CSP
app.get('/api/data', (req, res) => {
  res.json({ data: 'API response' });
});

app.listen(3000);
```

## Method 5: Strict CSP with Nonce (Advanced)

For stricter security, use nonce-based CSP:

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use((req, res, next) => {
  // Generate nonce for this request
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' https://askable.gentic.in  'nonce-${nonce}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;`
  );
  next();
});

app.get('/', (req, res) => {
  const nonce = res.locals.nonce;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My App</title>
    </head>
    <body>
      <h1>Hello World</h1>
      <script nonce="${nonce}" src="https://askable.gentic.in/versions/latest/askable-ws.js" 
              data-site-id="YOUR_SITE_ID" 
              data-widget-type="ws"></script>
    </body>
    </html>
  `);
});

app.listen(3000);
```

## Method 6: Using Next.js with Express

If using Next.js with a custom Express server:

```javascript
const express = require('express');
const next = require('next');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          'https://askable.gentic.in'
        ],
        'connect-src': [
          "'self'",
          'https://askable.gentic.in',
          'wss://askable.gentic.in',
          'wss://*.askable.gentic.in'
        ],
        'media-src': ["'self'", 'blob:'],
        'worker-src': ["'self'", 'blob:'],
        'child-src': ["'self'", 'blob:']
      }
    }
  }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

## Testing

1. Start your Express server:
   ```bash
   node server.js
   ```

2. Verify headers:
   ```bash
   curl -I http://localhost:3000
   ```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Headers Not Appearing

1. Ensure middleware is placed before route handlers
2. Check middleware order (CSP middleware should run early)
3. Verify headers are set before `res.send()` or `res.json()`

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Restart server and test

### Helmet Conflicts

If using helmet with other middleware:
1. Check helmet configuration
2. Ensure CSP directives don't conflict
3. Use helmet's `contentSecurityPolicy: false` and set manually if needed

### Nonce Not Working

1. Ensure nonce is generated before rendering HTML
2. Verify nonce is injected into all script tags
3. Check nonce format matches CSP header
