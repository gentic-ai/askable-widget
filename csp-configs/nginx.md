# Nginx CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Nginx.

## Basic Configuration

Add to your Nginx server block in `/etc/nginx/sites-available/your-site`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Add CSP header
    add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
    
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## HTTPS Configuration

For HTTPS sites:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Add CSP header
    add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
    
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## Using a Separate CSP File

Create `/etc/nginx/conf.d/csp.conf`:

```nginx
# Content Security Policy for Askable Widget
add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
```

Include in your server block:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    include /etc/nginx/conf.d/csp.conf;
    
    location / {
        root /var/www/html;
        index index.html;
    }
}
```

## Conditional CSP Based on Path

Apply CSP only to specific paths:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Apply CSP to all pages
    location / {
        add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
        
        root /var/www/html;
        index index.html;
    }
    
    # Exclude API endpoints from CSP
    location /api/ {
        proxy_pass http://backend;
        # No CSP header here
    }
}
```

## Strict CSP with Nonce (Advanced)

For stricter security, use nonce-based CSP. This requires server-side rendering:

```nginx
# Note: This requires a backend that generates nonces
# The nonce must be injected into HTML before serving

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        # Nonce will be injected by backend
        add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  'nonce-{NONCE}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
        
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }
}
```

## Reverse Proxy Configuration

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Add CSP header to proxied responses
    add_header Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;" always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Important: Don't override CSP if backend sets it
        proxy_hide_header Content-Security-Policy;
    }
}
```

## Testing Configuration

1. Test Nginx configuration:
   ```bash
   sudo nginx -t
   ```

2. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

3. Verify headers:
   ```bash
   curl -I http://your-domain.com
   ```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Headers Not Appearing

1. Ensure `always` parameter is used (required for error responses)
2. Check for conflicting `add_header` directives
3. Verify Nginx configuration syntax: `sudo nginx -t`

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Reload Nginx: `sudo systemctl reload nginx`

### Multiple CSP Headers

If you see multiple CSP headers:
1. Check for duplicate `add_header` directives
2. Remove conflicting CSP headers from backend
3. Use `proxy_hide_header` to remove backend CSP headers

### Static Files Not Loading

1. Ensure CSP allows `'self'` for static assets
2. Check file paths and permissions
3. Verify Nginx can serve static files
