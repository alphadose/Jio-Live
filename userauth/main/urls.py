from django.conf.urls import url,include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from main.views import EventViewSet

router=DefaultRouter()
router.include_format_suffixes = False
router.register(r'events', EventViewSet)
urlpatterns =format_suffix_patterns([
    url(r'^',include(router.urls)),
])
