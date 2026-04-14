import re
import bleach
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

def sanitize_html(text):
    """Remove all HTML tags and scripts"""
    if not text:
        return text
    return bleach.clean(text, tags=[], strip=True)

def sanitize_input(text):
    """Sanitize text input by removing dangerous characters"""
    if not text:
        return text
    # Remove HTML tags
    text = sanitize_html(str(text))
    # Remove null bytes
    text = text.replace('\x00', '')
    return text.strip()

def validate_phone_number(phone):
    """Validate phone number format"""
    if not phone:
        return True
    # Remove spaces, dashes, parentheses
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    # Check if it's a valid phone (digits and optional +)
    if not re.match(r'^\+?[\d]{9,15}$', cleaned):
        raise ValidationError('Invalid phone number format')
    return True

def validate_email_address(email):
    """Validate email format"""
    try:
        validate_email(email)
        return True
    except ValidationError:
        raise ValidationError('Invalid email address')

def validate_text_length(text, min_length=1, max_length=5000):
    """Validate text length"""
    if not text or len(text) < min_length:
        raise ValidationError(f'Text must be at least {min_length} characters')
    if len(text) > max_length:
        raise ValidationError(f'Text must not exceed {max_length} characters')
    return True
