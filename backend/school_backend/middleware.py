"""
Security headers middleware for St. Lawrence Academy.
Adds CSP, Referrer-Policy, Permissions-Policy and other protective headers to every response.
"""


class SecurityHeadersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Content Security Policy — restrict what resources can load
        response['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
            "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
            "img-src 'self' data: blob: https:; "
            "connect-src 'self'; "
            "frame-src 'none'; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "form-action 'self';"
        )

        # Prevent browsers from MIME-sniffing
        response['X-Content-Type-Options'] = 'nosniff'

        # Block clickjacking
        response['X-Frame-Options'] = 'DENY'

        # Referrer — don't leak full URL to third parties
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Disable browser features that aren't needed
        response['Permissions-Policy'] = (
            'camera=(), microphone=(), geolocation=(), '
            'payment=(), usb=(), magnetometer=(), gyroscope=()'
        )

        # Remove server fingerprinting headers if present
        try:
            del response['Server']
        except KeyError:
            pass
        try:
            del response['X-Powered-By']
        except KeyError:
            pass

        return response
