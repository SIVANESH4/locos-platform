
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import TechnicianProfile
from .serializers import TechnicianProfileSerializer


class TechnicianProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TechnicianProfileSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "patch", "head", "options"]

    def get_object(self):
        user = self.request.user

        if user.role != "TECHNICIAN":
            raise PermissionDenied(
                "Only technicians can access this profile."
            )

        return TechnicianProfile.objects.get(user=user)
