from django.shortcuts import render


# Create your views here.
def home(request):
    template = 'core/index.html'
    return render(request, template)


def about(request):
    template = 'core/about.html'
    return render(request, template)


def store(request):
    template = 'core/store.html'
    return render(request, template)


def contact(request):
    template = 'core/contact.html'
    return render(request, template)


def sample(request):
    template = 'core/sample.html'
    return render(request, template)
