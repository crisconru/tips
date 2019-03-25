from django.shortcuts import render, get_object_or_404
from .models import Post, Category


# Create your views here.
def blog(request):
    template = 'blog/blog.html'
    context = {'posts': Post.objects.all()}
    return render(request, template, context)


def category(request, category_id):
    template = 'blog/category.html'
    category = get_object_or_404(Category, id=category_id)
    context = {'category': category}
    return render(request, template, context)
