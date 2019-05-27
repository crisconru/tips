from django.shortcuts import render, get_object_or_404
from .models import Page


# Create your views here.
def page(request, page_id, page_slug):
    page = get_object_or_404(Page, id=page_id)
    template = 'pages/sample.html'
    context = {'page': page}
    return render(request, template, context)
