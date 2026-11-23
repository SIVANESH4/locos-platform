from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny

from .tokens import (verify_verification_token, generate_verification_token)
from .models import User


from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        token = generate_verification_token(user)

        verification_url = request.build_absolute_uri(
            reverse("verify-email")
        ) + f"?token={token}"

        message = (
            f"Hello {user.first_name},\n\n"
            f"Verify your email using this link:\n"
            f"{verification_url}\n\n"
            "This link expires in 24 hours."
        )

        send_mail(
            subject="Verify your Locos account",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return Response(
            {
                "message": "Registration successful. Please check your email to verify your account."
            },
            status=status.HTTP_201_CREATED,
        )

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.query_params.get("token")

        if not token:
            raise ValidationError({"token": "Verification token is required."})

        user_id = verify_verification_token(token)

        if not user_id:
            raise ValidationError({"token": "Invalid or expired verification link."})

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise ValidationError({"token": "Invalid verification link."})

        if user.is_verified:
            return Response({
                "message": "Email address is already verified."
            })

        user.is_verified = True
        user.save(update_fields=["is_verified"])

        return Response({
            "message": "Email verified successfully. You can now log in."
        })

class ResendVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()

        if not email:
            raise ValidationError({"email": "Email is required."})

        user = User.objects.filter(email__iexact=email).first()

        # Use the same response to avoid revealing whether an account exists.
        if user and not user.is_verified:
            token = generate_verification_token(user)

            verification_url = request.build_absolute_uri(
                reverse("verify-email")
            ) + f"?token={token}"
            print("\nACTUAL VERIFICATION URL:")
            print(verification_url)
            print()

            send_mail(
                subject="Verify your Locos account",
                message=(
                    f"Hello {user.first_name},\n\n"
                    f"Verify your email using this link:\n"
                    f"{verification_url}\n\n"
                    "This link expires in 24 hours."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
            )

        return Response({
            "message": "If an unverified account exists, a verification email has been sent."
        })