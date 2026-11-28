from django.conf import settings
from django.db import models


class TechnicianProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="technician_profile"
    )

    profile_photo = models.ImageField(
        upload_to="technician_profiles/",
        blank=True,
        null=True
    )

    bio = models.TextField(blank=True)

    experience_years = models.PositiveIntegerField(default=0)

    location = models.CharField(max_length=255, blank=True)

    phone_number = models.CharField(max_length=15, blank=True)

    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    category = models.ForeignKey(
    "categories.ServiceCategory",
    on_delete=models.PROTECT,
    related_name="technicians",
    null=True,
    blank=True,
)

    def __str__(self):
        return self.user.email