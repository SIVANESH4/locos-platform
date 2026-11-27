from rest_framework import serializers

from .models import TechnicianProfile


class TechnicianProfileSerializer(serializers.ModelSerializer):

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
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]