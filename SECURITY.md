# Security Notes

This is a static client-side website. HTML, CSS and JavaScript are delivered to the browser, so they cannot be completely hidden from someone using Developer Tools.

Minification can make source code harder to read, but it is not encryption or a security boundary. Never place API keys, passwords, authentication tokens, database credentials, private environment variables or other secrets in frontend files.

Sensitive operations should be handled by a backend. Static hosting such as GitHub Pages does not provide server-side secret protection. When a backend is introduced, authentication, authorization, validation, rate limiting and secret storage should be implemented server-side.

The contact form is prepared for Formspree but does not contain credentials. Replace its placeholder endpoint only with a public form endpoint intended for browser use.

The site includes lightweight right-click and common shortcut deterrents for casual inspection. These are not real security measures and can be bypassed. They should never be treated as protection for source code or secrets.

HTTP security headers such as Content-Security-Policy, Strict-Transport-Security, Referrer-Policy and Permissions-Policy must be configured by the hosting server, CDN or platform. HTML alone cannot configure HTTP response headers. Do not add a restrictive CSP without checking its font and form requirements.
