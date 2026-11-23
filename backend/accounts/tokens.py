
from django.core import signing

VERIFICATION_SALT = "locos-email-verification"


def generate_verification_token(user):
    """Generate a signed email verification token."""
    return signing.dumps(
        {"user_id": user.pk},
        salt=VERIFICATION_SALT,
    )


def verify_verification_token(token):
    """Validate the token and return the associated user ID."""
    try:
        data = signing.loads(
            token,
            salt=VERIFICATION_SALT,
            max_age=60 * 60 * 24,  # 24 hours
        )
        return data.get("user_id")

    except signing.BadSignature:
        return None
