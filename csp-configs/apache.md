# Apache CSP Configuration

Configure Content Security Policy (CSP) headers for the Askable widget on Apache.

## Method 1: Using .htaccess (Recommended for Shared Hosting)

Create or update `.htaccess` in your website root:

```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
</IfModule>
```

## Method 2: Using Virtual Host Configuration

Add to your Apache virtual host configuration (usually in `/etc/apache2/sites-available/your-site.conf`):

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Add CSP header
    Header always set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
</VirtualHost>
```

## Method 3: Using mod_headers in httpd.conf

Add to `/etc/apache2/apache2.conf` or `/etc/httpd/httpd.conf`:

```apache
LoadModule headers_module modules/mod_headers.so

<IfModule mod_headers.c>
    Header always set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
</IfModule>
```

## Method 4: Conditional CSP Based on Path

Apply CSP only to specific paths:

```apache
<IfModule mod_headers.c>
    # Apply CSP to HTML pages only
    <FilesMatch "\.(html|htm)$">
        Header set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    </FilesMatch>
</IfModule>
```

## Method 5: Using Location Directive

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html
    
    <Location />
        Header set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
    </Location>
</VirtualHost>
```

## HTTPS Configuration

For HTTPS sites:

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Add CSP header
    Header always set Content-Security-Policy "script-src 'self' https://askable.gentic.in  ; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
</VirtualHost>
```

## Strict CSP with Nonce (Advanced)

For stricter security, use nonce-based CSP. This requires server-side rendering:

```apache
# Note: This requires a backend that generates nonces
# The nonce must be injected into HTML before serving

<IfModule mod_headers.c>
    Header set Content-Security-Policy "script-src 'self' https://askable.gentic.in  'nonce-{NONCE}'; connect-src 'self' https://askable.gentic.in wss://askable.gentic.in wss://*.askable.gentic.in; media-src 'self' blob:; worker-src 'self' blob:; child-src 'self' blob:;"
</IfModule>
```

## Enable mod_headers

If mod_headers is not enabled:

**Ubuntu/Debian:**
```bash
sudo a2enmod headers
sudo systemctl restart apache2
```

**CentOS/RHEL:**
```bash
# Edit /etc/httpd/conf.modules.d/00-base.conf
# Uncomment: LoadModule headers_module modules/mod_headers.so
sudo systemctl restart httpd
```

## Testing Configuration

1. Test Apache configuration:
   ```bash
   sudo apache2ctl configtest
   # or
   sudo httpd -t
   ```

2. Reload Apache:
   ```bash
   sudo systemctl reload apache2
   # or
   sudo systemctl reload httpd
   ```

3. Verify headers:
   ```bash
   curl -I http://your-domain.com
   ```

Look for the `Content-Security-Policy` header in the response.

## Troubleshooting

### Headers Not Appearing

1. Ensure `mod_headers` is enabled: `a2enmod headers`
2. Check Apache error logs: `/var/log/apache2/error.log`
3. Verify `.htaccess` is allowed: `AllowOverride All`

### CSP Violations

1. Check browser console for specific violations
2. Add required sources to appropriate directives
3. Reload Apache: `sudo systemctl reload apache2`

### .htaccess Not Working

1. Verify `AllowOverride All` is set in virtual host
2. Check file permissions on `.htaccess`
3. Ensure mod_rewrite is enabled (if using other rules)

### Multiple CSP Headers

If you see multiple CSP headers:
1. Check for duplicate `Header set` directives
2. Remove conflicting CSP headers from backend
3. Use `Header unset` to remove backend CSP headers

### Static Files Not Loading

1. Ensure CSP allows `'self'` for static assets
2. Check file paths and permissions
3. Verify Apache can serve static files
