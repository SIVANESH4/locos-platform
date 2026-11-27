
from django.urls import path
from .views import TechnicianProfileView

urlpatterns = [
    path(
        "profile/",
        TechnicianProfileView.as_view(),
        name="technician-profile",
    ),
]
