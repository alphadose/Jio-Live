from django.shortcuts import render

from .models import Event
from .serializers import EventSerializer
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.filter(current_live=True)
