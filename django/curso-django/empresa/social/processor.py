from .models import Link


def ctx_dict(request):
    ctx = {}
    for link in Link.objects.all():
        ctx[link.key] = link.url
    return ctx
