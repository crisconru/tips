from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Page


# Create your views here.
class PageListView(ListView):
    model = Page


class PageDetailView(DetailView):
    model = Page


class PageCreateView(CreateView):
    model = Page
    fields = ['title', 'content', 'order']
    success_url = reverse_lazy('pages:pages')

class PageUpdateView(UpdateView):
    model = Page
    fields = ['title', 'content', 'order']
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('pages:update', args=[self.object.id]) + '?ok'

class PageDeleteView(DeleteView):
    model = Page
    success_url = reverse_lazy('pages:pages')
