from django.shortcuts import render
from .models import Service

# Create your views here.
def services(request):
    template = 'services/services.html'
    services = Service.objects.all()
    context = {'services': services}
    return render(request, template, context)
