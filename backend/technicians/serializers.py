from rest_framework import serializers

from .models import TechnicianProfile

from categories.models import ServiceCategory

class TechnicianProfileSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.filter(is_active=True),
        required=False,
        allow_null=True
    )

    class Meta:
        model = TechnicianProfile
        fields = [
            "id",
            "profile_photo",
            "bio",
            "experience_years",
            "location",
            "phone_number",
            "is_available",
            "category",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]