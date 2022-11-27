from django.shortcuts import render
from .models import Project


# Create your views here.
def portfolio(request):
    template = 'portfolio/portfolio.html'
    projects = Project.objects.all()
    context = {'projects': projects}
    return render(request, template, context)
