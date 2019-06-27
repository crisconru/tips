# Django Avanzado

## Vistas Basadas en Clases

En el `views.py` importo el modelo que quiera, por ejemplo `TemplateView`. Hago que hereden de mi modelo, defino su template, y modifico el contexto con la función `get_context_data()`.

```python
from django.views.generic.base import TemplateView

class HomePageView(TemplateView):
    template_name = 'core/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Mi chachi web'
        return context

class SamplePageView(TemplateView):
    template_name = 'core/sample.html'

```

En el `urls.py` importo las vistas y las llamo con la función `as_view()`.

```python
from django.urls import path
from .views import HomePageView, SamplePageView

urlpatterns = [
    path('', HomePageView.as_view(), name="home"),
    path('sample/', SamplePageView.as_view(), name="sample"),
]
```

Si la modificación en el contexto es poca, podría hacer en el `views.py`

```python
from django.views.generic.base import TemplateView
from django.shortcuts import render

class HomePageView(TemplateView):
    template_name = 'core/home.html'


    def get(self, request, *args, **kwargs):
        context = {'title': 'Mi chachi web'}
        return render(request, self.template_name, context)
```

### ListView

Cuando tenemos un modelo, y queremos ver listados varios objetos, una buena opción es usar una `ListView`. Si solo quisieramos ver uno en detalle, deberías de optar por `DetailView`.

`views.py` -> Tendremos que importar `ListView`, dentro de la clase definirle que modelo de la bbdd vamos a usar.

```python
from django.views.generic.list import ListView
from .models import Page


# Create your views here.
class PageListView(ListView):
    model = Page
```

`urls.py` -> Modificar las urls

```python
from django.urls import path
from .views import PageListView

urlpatterns = [
    path('', PageListView.as_view(), name='pages'),
]
```

`templates/<app>/<modelo>_list.html` -> Veremos que si arrancamos el server da un error, y es porque esta vista usa un template llamado `<modelo>_list.html`. Así que en nuestra carpeta de templates, deberemos de llamar así a su template html. Además, donde tengamos el `for` para mostrar todos los elementos, debemos de usar el objeto `object` o el nombre del modelo (en este caso `page`)

```html
# Este sería el genérico
{% for page in object_list %}
# Este sería más específico, pero para el caso es igual
{% for page in page_list %}
```

### DetailView

Para ver en detalle un único elemento de la bbdd, se suele usar `DetailView`

`views.py` -> Importar `DetailView`, así como el objeto del modelo de la bbdd y definirlo dentro de la clase.

```python
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Page


# Create your views here.
class PageListView(ListView):
    model = Page


class PageDetailView(DetailView):
    model = Page
```

`urls.py` -> Ojo en el pattern, que usa `pk` como índice.

```python
from django.urls import path
from .views import PageListView, PageDetailView

urlpatterns = [
    path('', PageListView.as_view(), name='pages'),
    path('<int:pk>/<slug:slug>/', PageDetailView.as_view(), name='page'),
]
```

`template/<app>/<modelo>_detail.html` -> `DetailView` usa un template html llamado `<modelo>_detail.html`, así que debemos nombrar así al nuestro para que lo lea. De nuevo, tenemos que usar `object` dentro del template o el nombre del modelo (`page` en este caso).

## Vistas CRUD

Son un tipo de vistas basadas en clases, que están pensadas para interactuar con la bbdd.

Create Read Update Delete

### CreateView - Vista CRUD

Sirve para poder crear una página donde un admin pueda editar / crear un objeto de la bbdd.

`views.py` -> Importa `CreateView`, añade el modelo de la bbdd así como los campos a editar. El campo `sucess_url` es la vista que se pondrá cuando hayas completado el formulario

```python
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Page


# Create your views here.
class PageListView(ListView):
    model = Page


class PageDetailView(DetailView):
    model = Page


class PageCreate(CreateView):
    model = Page
    fields = ['title', 'content', 'order']
    success_url = reverse_lazy('pages:pages')

```

`urls.py` -> Importa la vista.

```python
from django.urls import path
from .views import PageListView, PageDetailView, PageCreate

pages_patterns = ([
    path('', PageListView.as_view(), name='pages'),
    path('<int:pk>/<slug:slug>/', PageDetailView.as_view(), name='page'),
    path('create/', PageCreate.as_view(), name='create'),
], 'pages')
```

`template/<app>/<modelo>_form.html` -> `CreateView` usa una plantilla llamada `<modelo>_form.html`, así que debes de renombrar así la tuya.

### UpdateView - Vista CRUD

Es muy parecida a la anterior, pero ahora lo que vas a hacer es actualizar en lugar de crear.

`views.py` -> La importas y solo necesitas pasarle 3 atributos, el modelo, los campos y por último el `template_name_suffix`. Con este campo se le indica que archivo tiene que leer cuando se ejecute (por defecto se pone `_update_form`). Para que devuelva una página al ser actualizado, habría que usar como antes el atributo `succes_url`. Si quieres que vuelva al mismo sitio (como en el ejemplo), sobreescribes la función `get_success_url` y devuelves el mismo objeto (si le añades algún parámetro, luego en el template puedes hacer que le indique al usuario que la actualización ha sido correcta).

```python
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView
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

```

`urls.py` -> Debes de pasarle un `pk` para poder saber cual objeto editar.

```python
from django.urls import path
from .views import PageListView, PageDetailView, PageCreateView, PageUpdateView

pages_patterns = ([
    path('', PageListView.as_view(), name='pages'),
    path('<int:pk>/<slug:slug>/', PageDetailView.as_view(), name='page'),
    path('create/', PageCreateView.as_view(), name='create'),
    path('update/<int:pk>/', PageUpdateView.as_view(), name='update'),
], 'pages')
```

`template/<app>/<modelo>_update_form` -> Por último, el template que usa esta vista es `<modelo>_update_form`, que se lo has definido en el `views.py`.

### DeleteView - Vista CRUD

Vista para borrar un objeto.

`views.py` -> Importar la clase `DeleteView` y pasarle el modelo así como la url para cuando el borrado se haya completado.

```python
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

```

`urls.py` -> Tienes que pasarle un pk o un slug para borrar el elemento.

```python
from django.urls import path
from .views import PageListView, PageDetailView, PageCreateView, \
    PageUpdateView, PageDeleteView

pages_patterns = ([
    path('', PageListView.as_view(), name='pages'),
    path('<int:pk>/<slug:slug>/', PageDetailView.as_view(), name='page'),
    path('create/', PageCreateView.as_view(), name='create'),
    path('update/<int:pk>/', PageUpdateView.as_view(), name='update'),
    path('delete/<int:pk>/', PageDeleteView.as_view(), name='delete'),
], 'pages')
```

`template/<app>/<modelo>_confirm_delete.html` -> Por último tienes que crear el formulario de borrado en una template que se llame `<modelo>_confirm_delete.html`

## Formularios para Modelos

TODO

## Incluir una plantilla html en todas las plantillas de la app

Si quieres que en todas las plantillas de la app aparezca cierto código html común, debes de:

1. Crear el directorio `<proyecto>/<app>/templates/includes`.
2. Dentro de `includes` crear tu plantilla html común para los demás.
3. En cada plantilla html de tu app, en el dentro de tu `{% block content %}`, añadirla con `{% include '<app>/includes/<template>.html' %}`

## Definir estructuras en los urlspattern

Suponte que tienes varias apps, donde hay una vista que se llama igual, por ejemplo `create`. En el `urls.py` le tienes puesto `name=<app>_create` para que no coincidan. Para no tener que hacer eso, se puede usar una reestructura de los urlpatterns.

`<app>/urls.py` -> Le pones el nombre que quieras al `urlpatterns`, pero ahora en vez de ser una lista como antes, va a ser una tupla, que tiene en su primer miembro el `urlpatterns`, y en el segundo un nombre de referencia. Ahora puedes asignar nombres genéricos en el `urlpatterns`, como es el caso de `create` que lo vas a usar en más `urls.py` de otras apps.

```python
from django.urls import path
from .views import PageListView, PageDetailView, PageCreate

pages_patterns = ([
    path('', PageListView.as_view(), name='pages'),
    path('<int:pk>/<slug:slug>/', PageDetailView.as_view(), name='page'),
    path('create/', PageCreate.as_view(), name='create'),
], 'pages')
```

`<proyecto>/<proyecto>/urls.py` -> Importa tu `urlpatterns` tuneado (en este caso `pages_urlpatterns`), y lo incluyes directamente en la función `include()`.

```python
from django.contrib import admin
from django.urls import path, include
from pages.urls import pages_patterns

urlpatterns = [
    path('', include('core.urls')),
    path('pages/', include(pages_patterns)),
    path('admin/', admin.site.urls),
]
```

`<..>/template/<..>` -> Lo único que te falta es que ahora, en todas las templates que lo enlazas con `{% urls '<vista>' ... %}` debes de poner `{% urls '<urls de donde vengo>:<vista>' ... %}`. En este ejemplo sería:

1. `{% urls 'pages:pages' ... %}` Cuando es un template fuera de la app, que enlaza desde el `urls.py` del proyecto a la app.
2. `{% urls 'pages:create' ... %}` Cuando es un template dentro de la app, que enlaza desde el `urls.py` de la propia app.

# TODO