from django.views.generic.base import TemplateView
from django.shortcuts import render

class HomePageView(TemplateView):
    template_name = 'core/home.html'


    def get(self, request, *args, **kwargs):
        context = {'title': 'Klin web Playground'}
        return render(request, self.template_name, context)

    '''
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Klin web Playground'
        return context
    '''

class SamplePageView(TemplateView):
    template_name = 'core/sample.html'
