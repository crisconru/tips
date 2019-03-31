from django.shortcuts import render, redirect
from django.urls import reverse
from django.core.mail import EmailMessage

from .forms import ContactForm


# Create your views here.
def contact(request):
    if request.method == 'POST':
        contact_form = ContactForm(data=request.POST)
        if contact_form.is_valid():
            name = request.POST.get('name', '')
            email = request.POST.get('email', '')
            content = request.POST.get('content', '')
            mail = EmailMessage(
                'Klinware: Querid@ hamij@',
                f'De {name} <{email}>\n\nEscribio:\n{content}',
                'noreply@inbox.mailtrap.io',
                ['crisconru@gmail.com', 'klintonnnn@hotmail.com'],
                reply_to=[email]
            )
            try:
                mail.send()
                return redirect(reverse('contact') + '?OK')
            except:
                return redirect(reverse('contact') + '?FAIL')
                
    template = 'contact/contact.html'
    context = {
        'form': ContactForm(),
    }
    return render(request, template, context)
