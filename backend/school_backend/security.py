"""
Central security utilities for St. Lawrence Academy backend.
Used by all serializers and views for consistent input sanitization and validation.
"""
import re
import bleach
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


# ── Sanitization ─────────────────────────────────────────────────────────────

def sanitize_text(value):
    """Strip all HTML tags, null bytes, and control characters. Returns clean plain text."""
    if not value:
        return value
    value = str(value)
    value = bleach.clean(value, tags=[], strip=True)   # strip all HTML/scripts
    value = value.replace('\x00', '')                  # null bytes
    value = re.sub(r'[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]', '', value)  # control chars
    return value.strip()


def sanitize_rich(value, allowed_tags=None):
    """
    Sanitize rich/blog content — keeps a safe subset of HTML tags.
    Use ONLY for admin-entered content (blog posts), NOT user input.
    """
    if not value:
        return value
    safe_tags = allowed_tags or [
        'p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'h4',
        'ul', 'ol', 'li', 'blockquote', 'a', 'img',
    ]
    safe_attrs = {'a': ['href', 'title'], 'img': ['src', 'alt']}
    return bleach.clean(str(value), tags=safe_tags, attributes=safe_attrs, strip=True)


# ── Validators ────────────────────────────────────────────────────────────────

def validate_name(value, field='Name', min_len=2, max_len=200):
    if not value or len(value.strip()) < min_len:
        raise ValidationError(f'{field} must be at least {min_len} characters.')
    if len(value) > max_len:
        raise ValidationError(f'{field} must not exceed {max_len} characters.')
    # Reject strings that look like HTML/script injection
    if re.search(r'<[^>]+>', value):
        raise ValidationError(f'{field} contains invalid characters.')


def validate_email_field(value):
    try:
        validate_email(value)
    except ValidationError:
        raise ValidationError('Enter a valid email address.')


def validate_phone_field(value):
    if not value:
        return
    cleaned = re.sub(r'[\s\-\(\)\+]', '', value)
    if not re.match(r'^\d{7,15}$', cleaned):
        raise ValidationError('Enter a valid phone number (7–15 digits).')


def validate_text(value, field='Text', min_len=1, max_len=5000):
    if not value or len(value.strip()) < min_len:
        raise ValidationError(f'{field} must be at least {min_len} characters.')
    if len(value) > max_len:
        raise ValidationError(f'{field} must not exceed {max_len} characters.')


def validate_url(value):
    if value and not re.match(r'^https?://', value, re.I):
        raise ValidationError('Enter a valid URL starting with http:// or https://')


# ── File upload validation ────────────────────────────────────────────────────

ALLOWED_IMAGE_TYPES = {'image/jpeg', 'image/png', 'image/gif', 'image/webp'}
ALLOWED_DOC_TYPES   = {'application/pdf', 'image/jpeg', 'image/png'}
ALLOWED_IMAGE_EXTS  = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
ALLOWED_DOC_EXTS    = {'.pdf', '.jpg', '.jpeg', '.png'}
MAX_IMAGE_SIZE      = 5  * 1024 * 1024   # 5 MB
MAX_DOC_SIZE        = 10 * 1024 * 1024   # 10 MB

# Magic bytes for real file-type verification (not spoofable by browser)
_IMAGE_SIGNATURES = [
    b'\xff\xd8\xff',              # JPEG
    b'\x89PNG\r\n\x1a\n',         # PNG
    b'GIF87a', b'GIF89a',         # GIF
    b'RIFF',                      # WebP (followed by 4 bytes then WEBP)
]
_PDF_SIGNATURE = b'%PDF'


def _check_magic_bytes(file, allowed_signatures):
    """Read the first 12 bytes and check against known magic byte sequences."""
    try:
        file.seek(0)
        header = file.read(12)
        file.seek(0)
        return any(header.startswith(sig) for sig in allowed_signatures)
    except Exception:
        return False


def validate_image_upload(file):
    if not file:
        return
    if file.size > MAX_IMAGE_SIZE:
        raise ValidationError('Image must be smaller than 5 MB.')

    # Check declared content-type
    content_type = getattr(file, 'content_type', '')
    if content_type and content_type not in ALLOWED_IMAGE_TYPES:
        raise ValidationError('Only JPEG, PNG, GIF, and WebP images are allowed.')

    # Check file extension (case-insensitive)
    import os
    ext = os.path.splitext(getattr(file, 'name', ''))[1].lower()
    if ext and ext not in ALLOWED_IMAGE_EXTS:
        raise ValidationError('Only JPEG, PNG, GIF, and WebP images are allowed.')

    # Verify actual file content via magic bytes
    if not _check_magic_bytes(file, _IMAGE_SIGNATURES):
        raise ValidationError('File content does not match a valid image format.')


def validate_doc_upload(file):
    if not file:
        return
    if file.size > MAX_DOC_SIZE:
        raise ValidationError('File must be smaller than 10 MB.')

    # Check declared content-type
    content_type = getattr(file, 'content_type', '')
    if content_type and content_type not in ALLOWED_DOC_TYPES:
        raise ValidationError('Only PDF and image files are accepted.')

    # Check file extension (case-insensitive)
    import os
    ext = os.path.splitext(getattr(file, 'name', ''))[1].lower()
    if ext and ext not in ALLOWED_DOC_EXTS:
        raise ValidationError('Only PDF and image files are accepted.')

    # Verify actual file content via magic bytes (PDF or image)
    all_doc_sigs = _IMAGE_SIGNATURES + [_PDF_SIGNATURE]
    if not _check_magic_bytes(file, all_doc_sigs):
        raise ValidationError('File content does not match a valid document format.')
