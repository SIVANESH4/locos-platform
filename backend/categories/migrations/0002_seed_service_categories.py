
from django.db import migrations
from django.utils.text import slugify


CATEGORIES = [
    ("Electrical", "Electrical installation and repairs", "zap"),
    ("Plumbing", "Water pipes, taps and plumbing repairs", "wrench"),
    ("AC Repair", "Air conditioning installation and servicing", "snowflake"),
    ("Carpentry", "Furniture and woodwork services", "hammer"),
    ("Painting", "Interior and exterior painting", "paintbrush"),
    ("Appliance Repair", "Home appliance repairs", "settings"),
    ("Cleaning", "Residential and commercial cleaning", "sparkles"),
    ("Welding", "Metal fabrication and welding", "flame"),
]


def seed_categories(apps, schema_editor):
    ServiceCategory = apps.get_model("categories", "ServiceCategory")

    for name, description, icon in CATEGORIES:
        ServiceCategory.objects.get_or_create(
            name=name,
            defaults={
                "slug": slugify(name),
                "description": description,
                "icon": icon,
                "is_active": True,
            },
        )


def reverse_seed_categories(apps, schema_editor):
    ServiceCategory = apps.get_model("categories", "ServiceCategory")
    ServiceCategory.objects.filter(
        name__in=[item[0] for item in CATEGORIES]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("categories", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            seed_categories,
            reverse_seed_categories,
        ),
    ]
