# Django Avanzado

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

Dentro de tu app, creas un fichero llamado `forms.py` e importas `from django import forms`, para crear la estructura de los campos. Al enlazarle un modelo al formulario, este se genera automáticamente.

`forms.py` -> Importas el módulo `forms` y usas su clase `ModelForm`. Ahora debes de crear una clase `Meta` dentro, con el modelo y los campos. Con el atributo `widgets` le indicas que tipo de elemento html va a ser y dentro le pones los css que va a usar con el `attrs` y su diccionario. Con `labels` puedes cambiarle el texto del título del campo, quitándolo (como en el ejemplo) o poniéndole otro.

```python
from django import forms
from .models import Page

class PageForm(forms.ModelForm):

    class Meta:
        model = Page
        fields = ['title', 'content', 'order']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control',
                                            'placeholder': 'Título'}),
            'content': forms.Textarea(attrs={'class': 'form-control',
                                            'placeholder': 'Contenido'}),
            'order': forms.NumberInput(attrs={'class': 'form-control',
                                            'placeholder': 'Orden'})
        }
        labels = { 'title': '', 'content': '', 'order': ''}

```

`views.py` -> Importas el formulario y lo metes dentro de su vista. Ahora el campo `fields` no es necesario porque va en el formulario.

```python
from django.views.generic.edit import CreateView, UpdateView
from django.urls import reverse_lazy
from .models import Page
from .forms import PageForm


class PageCreateView(CreateView):
    model = Page
    form_class = PageForm
    success_url = reverse_lazy('pages:pages')


class PageUpdateView(UpdateView):
    model = Page
    form_class = PageForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('pages:update', args=[self.object.id]) + '?ok'
```

### ckeditor adaptativo

Para añadir y hacer adaptativo el ckeditor tienes que hacer lo siguiente:

`<app>/static/<app>/css/custom_ckeditor.css` -> Creas un fichero css donde editas los estilos del ckeditor.

```css
.django-ckeditor-widget, .cke_editor_id_content {
    width: 100% !important;
    max-width: 821px !important;
}
```

En el template que uses común para todos los demás templates, importalo y añade el link al css donde lo has a tuneado.

```html
{% load static %}
<script type="text/javascript" src="{% static "ckeditor/ckeditor-init.js" %}"></script>
<script type="text/javascript" src="{% static "ckeditor/ckeditor/ckeditor.js" %}"></script>
<link href="{% static 'pages/css/custom_ckeditor.css' %}" rel="stylesheet">
```

### Usuarios registrados

Es probable que muchos de los formularios solo quieras que los puedan usar usuarios admin o registrados. Siempre que no seas un usuario loggeado, Django te detecta como usuario anónimo, `AnonymousUser`.

`views.py` -> Para que en tu vista puedas detectar si el usuario está logeado, debes de reescribir el método `dispatch` de la clase. En él miras si el usuario está dentro del staff, y si no, lo rediriges donde quieras (por ejemplo, al login del admin).

```python
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Page
from .forms import PageForm
from django.shortcuts import redirect


# Create your views here.
class PageCreateView(CreateView):
    model = Page
    form_class = PageForm
    success_url = reverse_lazy('pages:pages')

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return redirect(reverse_lazy('admin:login'))
        return super(PageCreateView, self).dispatch(request, *args, **kwargs)
```

### Usuarios registrados - Mixins Manual

Si quieres que esa reedireción de antes se use en más vistas, no hace falta que copias ese método en cada vista. Existe un mecanismo llamado `Mixin` que permite escribirlo una vez y usarlo en todas.

`views.py` -> Creas una clase, que herede de `object` (en Python 3, por defecto, todas las clases heredan de `object`) y le pones el método `dispatch` de antes. Luego en cada vista haces que herede primero de esta nueva clase y luego de su modelo de vista.

```python
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Page
from .forms import PageForm
from django.shortcuts import redirect


# Create your views here.
class StaffRequiredMixin():
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return redirect(reverse_lazy('admin:login'))
        return super(StaffRequiredMixin, self).dispatch(request, *args, **kwargs)


class PageCreateView(StaffRequiredMixin, CreateView):
    model = Page
    form_class = PageForm
    success_url = reverse_lazy('pages:pages')



class PageUpdateView(StaffRequiredMixin, UpdateView):
    model = Page
    form_class = PageForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('pages:update', args=[self.object.id]) + '?ok'


class PageDeleteView(StaffRequiredMixin, DeleteView):
    model = Page
    success_url = reverse_lazy('pages:pages')
```

### Usuarios registrados - Mixins Decorado

El punto anterior ya se ha automatizado en Django usando decoradores.

`views.py` -> Tienes que importar por un lado el `method_decorator`, que permite usar decoradores de Django, y por otro el decorador `staff_member_required`. Ahora en el método `dispatch` puedes quitar el `if` con la redirección, ya que se va a hacer sola. Ahora en la url al entrar, incluso te dirá donde debe de ir despues de loguearse.

```python
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Page
from .forms import PageForm
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.contrib.admin.views.decorators import staff_member_required

# Create your views here.
class StaffRequiredMixin():

    @method_decorator(staff_member_required)
    def dispatch(self, request, *args, **kwargs):
        return super(StaffRequiredMixin, self).dispatch(request, *args, **kwargs)


class PageCreateView(StaffRequiredMixin, CreateView):
    model = Page
    form_class = PageForm
    success_url = reverse_lazy('pages:pages')


class PageUpdateView(StaffRequiredMixin, UpdateView):
    model = Page
    form_class = PageForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('pages:update', args=[self.object.id]) + '?ok'


class PageDeleteView(StaffRequiredMixin, DeleteView):
    model = Page
    success_url = reverse_lazy('pages:pages')


```

Pero tener una clase solo para eso no tiene sentido, así que se puede usar el decorador en las propias vistas usando el `method_decorator` y pasándole el decorador, así como el método a decorar

```python
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Page
from .forms import PageForm
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.contrib.admin.views.decorators import staff_member_required


# Create your views here.
@method_decorator(staff_member_required, name="dispatch")
class PageCreateView(CreateView):
    model = Page
    form_class = PageForm
    success_url = reverse_lazy('pages:pages')

@method_decorator(staff_member_required, name="dispatch")
class PageUpdateView(UpdateView):
    model = Page
    form_class = PageForm
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('pages:update', args=[self.object.id]) + '?ok'


@method_decorator(staff_member_required, name="dispatch")
class PageDeleteView(DeleteView):
    model = Page
    success_url = reverse_lazy('pages:pages')

```

Existen **2 decoradores más** que son interesantes: `login_required` y `permission_required`.

## Auth Views

Django tiene vistas de autenticación ya creadas: login, logout, ... No hace falta crearlas, él las genera.

`<proyecto>/<proyecto>/urls.py` -> Generar las urls para las vistas desde `accounts`.

```python
from django.contrib import admin
from django.urls import path, include
from pages.urls import pages_patterns

urlpatterns = [
    path('', include('core.urls')),
    path('pages/', include(pages_patterns)),
    path('admin/', admin.site.urls),
    # Paths de Auth
    path('accounts/', include('django.contrib.auth.urls')),
]
```

Si abres la url [accounts](http://127.0.0.1:8000/accounts/) te dice todos las urls que hay, como `accounts/login`.

### LoginView

Si abres `accounts/login` da error de template. Busca el template `<app>/login.html`, así que hay que crearlo.

`<app>/templates/<app>/login.html`

`settings.py` -> En el settings del proyecto tendremos que añadir la app al principio de todo, ya que muchos formularios pueden estar con conflicto con otras aplicaciones. También debemos de crear al final las redirecciones con la variable `LOGIN_REDIRECT_URL` donde se le indica donde ir al loguearse.

```python
# ...

INSTALLED_APPS = [
    'registration.apps.RegistrationConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ckeditor',
    'core.apps.CoreConfig',
    'pages.apps.PagesConfig',
]
# ...

# Auth redirects
LOGIN_REDIRECT_URL = 'home'
```

Luego en el template donde lo vayas a usar simplemente usa `{% url 'login' %}`

### LogoutView

Es parecido al anterior. En este caso solo tienes que definir la variable `LOGOUT_REDIRECT_URL` en el `settings`

```python
# Auth redirects
LOGIN_REDIRECT_URL = 'pages:pages'
LOGOUT_REDIRECT_URL = 'home'
```

Y luego en algún template puedes enlazar la acción con `{% url 'logout' %}`

```html
<ul class="navbar-nav">
    {% if not request.user.is_authenticated %}
        <li class="nav-item">
            <a class="nav-link" href="{% url 'login' %}">Acceder</a>
        </li>
    {% else %}
        <li class="nav-item">
            <a class="nav-link" href="{% url 'logout' %}">Salir</a>
        </li>
    {% endif %}
</ul>
```

## Registro de Usuario

Se suele hacer en una app aparte (`registration` por ejemplo).

`<app>/views.py` -> Importa el formulario de creación de usuario `UserCreationForm` y una vista genérica de creación como `CreateView`. Dentro de esta se le pasa el formulario en el atributo `form_class` así como su template. También debes de devolver la redirección con algún parámetro que permita saber que todo ha ido correcto.

```python
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import CreateView
from django.urls import reverse_lazy


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

```

`<app>/urls.py`

```python
from django.urls import path, include
from .views import SignUpView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
]

```

`<proyecto>/urls.py`

```python
from django.contrib import admin
from django.urls import path, include
from pages.urls import pages_patterns

urlpatterns = [
    path('', include('core.urls')),
    path('pages/', include(pages_patterns)),
    path('admin/', admin.site.urls),
    # Paths de Auth
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('registration.urls')),
]

```

`<app>/templates/<app>/<template_name>` -> Es un formulario normal y corriente.

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Registro{% endblock %}
{% block content %}
<style>.errorlist{color:red;}</style>
<main role="main">
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-9 mx-auto mb-5">
        <form action="" method="post">{% csrf_token %}
          <h3 class="mb-4">Registro</h3>
          {{form.as_p}}
          <p><input type="submit" class="btn btn-primary btn-block" value="Confirmar"></p>
        </form>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

`<app>/templates/<app>/<success_url>` -> Para poder ver si te ha ido bien podrías añadir

```html
{% if 'register' in request.GET %}
    <p style="color:green;">Usuario registrado correctamente, ya puedes loguearte.</p>
{% endif %}
```

### Customizar el registro

Para customizar el formulario de registro debes de trastearlo en tiempo de ejecución para no perder el que ya hay hecho.

`<app>/views.py` -> Tienes que sobreescribir el método `get_form()`, modificando sus campos, que son: `username`, `password1` y `password2`.

```python
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django import forms


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

    def get_form(self, form_class=None):
        form = super(SignUpView, self).get_form()
        # Customización en tiempo real
        form.fields['username'].widget = forms.TextInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Nombre de usuario'})
        form.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Contraseña'})
        form.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Repite la contraseña'})
        return form

```

`<app>/templates/<app>/<template_name>` -> Si quieres quitar todos los `labels`, lo puedes hacer desde el fichero anterior o simplemente en tu template pones

```html
<style>label{display:none}</style>
```

### Añadir email como requisito

Para que añadas un email al registro lo mejor es extender el formulario ya existente en Django.

`<app>/forms.py` -> Crea este fichero para extender el formulario. Añades el atributo `email`. En la clase `Meta` añades el atributo. con el método `clean_<field>` haces una validación, en este caso `clean_email` lo haces para que el `email` sea único para cada usuario (no puede haber dos usuarios con el mismo email) Si el email no existe, puede registrarse, sino, lanza un error de validación.

```python
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class UserCreationFormWithEmail(UserCreationForm):
    email = forms.EmailField(
        required=True,
        help_text='Requerido, 254 caracteres como máximo y que sea válido')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('El email ya existe, usa otro.')
        return email

```

`<app>/views.py` -> Cambiar el formulario anterior por el nuevo extendido, así como las modificaciones de su campo.

```python
from .forms import UserCreationFormWithEmail
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django import forms


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationFormWithEmail
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

    def get_form(self, form_class=None):
        form = super(SignUpView, self).get_form()
        # Customización en tiempo real
        form.fields['username'].widget = forms.TextInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Nombre de usuario'})
        form.fields['email'].widget = forms.EmailInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Email'})
        form.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Contraseña'})
        form.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Repite la contraseña'})
        return form

```

### Recuperar contraseña

Existen diferentes opciones, pero una típica es tener un servidor de correo SMTP que manda email con el link para el proceso de recuperación de contraseña. Aquí vas a hacer un truco para debug, que es tener un fichero local donde almacenas las credenciales.

`<proyecto>/settings.py` -> Añades lo siguiente al final. Con `EMAIL_BACKEND` le estas diciendo que use un backend de ficheros de prueba para el email. Con `EMAIL_FILE_PATH` le indicas donde guardar ese fichero.

```python
# Email
if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = os.path.join(BASE_DIR, 'sent_emails')
else:
    # Configuración del servidor de correo SMTP real de producción
    pass
```

Ahora te va a tocar sobreescribir los 4 templates que Django usa para recuperar la contraseña, ya que los que él ofrece son de forma admin, y tu quieres verlo como un usuario que ve el frontend. Los templates que debes crear son:

* `password_reset_form.html` -> Pedir nueva contraseña.
* `password_reset_done.html` -> Email con instrucciones enviado.
* `password_reset_confirm.html` -> Definir nueva contraseña.
* `password_reset_complete.html` -> Contraseña cambiada.

Por último, en el template login deberías de añadir la típica línea para si has olvidado la contraseña

```html
<p>
    <a href="{% url 'password_reset' %}">He olvidado mi contraseña</a>
</p>
```

Para ver todos los templates de Django para cuentas puedes verlo en

## Perfil de Usuario

### Crear perfil

`<app>/models.py` -> Creamos un modelo `Profile`, que tiene que tener una relación 1-1 con un usuario, una foto, biografía, web.

```python
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='profiles', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    link = models.URLField(max_length=200, null=True, blank=True)

```

`settings.py` -> Hay que despachar los ficheros media del avatar y no tocar la redirección del login.

```python
# Auth redirects
#LOGIN_REDIRECT_URL = 'pages:pages'
LOGOUT_REDIRECT_URL = 'home'


# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

`urls.py` -> Añadir al `urlpatterns` del proyecto donde se despachan los ficheros media.

```python
from django.contrib import admin
from django.urls import path, include
from pages.urls import pages_patterns
from django.conf import settings


urlpatterns = [
    path('', include('core.urls')),
    path('pages/', include(pages_patterns)),
    path('admin/', admin.site.urls),
    # Paths de Auth
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('registration.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

`<app>/views.py` -> Crear su vista, con el decorador `login_required` para cuando estés logueado.

```python
from .forms import UserCreationFormWithEmail
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django import forms
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationFormWithEmail
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

    def get_form(self, form_class=None):
        form = super(SignUpView, self).get_form()
        # Customización en tiempo real
        form.fields['username'].widget = forms.TextInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Nombre de usuario'})
        form.fields['email'].widget = forms.EmailInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Email'})
        form.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Contraseña'})
        form.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Repite la contraseña'})
        return form


@method_decorator(login_required, name='dispatch')
class ProfileUpdate(TemplateView):
    template_name = 'registration/profile_form.html'

```

`<app>/templates/<app>/<template_name>` -> Crear su template.

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Perfil{% endblock %}
{% block content %}
<main role="main">
  <div class="container">
    <div class="row mt-3 mb-5">
      <div class="col-md-9 mx-auto">
          <h3>Perfil</h3>
          <form action="" method="post">{% csrf_token %}
            {{ form.as_p }}
            <div class="text-center">
              <input type="submit" class="btn btn-primary btn-block" value="Actualizar" />
            </div>
          </form>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

`<app>/urls.py` -> Redireccionarla en la urls.

```python
from django.urls import path, include
from .views import SignUpView, ProfileUpdate

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('profile/', ProfileUpdate.as_view(), name='profile'),
]

```

`core/templates/base.html` -> Añadir un enlace.

```html
<li class="nav-item">
    <a class="nav-link" href="{% url 'profile' %}">Perfil</a>
</li>
```

Por último hacemos las migraciones.

```bash
python manage.py makemigrations <app>
python manage.py migrate <app>
```

### Perfil editable

`<app>views.py` -> Tienes que hacer que la vista herede de `UpdateView` (poniéndole su modelo y que campos son editables). Para que no de error a la hora de editar, se debe sobreescribir el método `get_object`, donde hay que obtener el usuario de la propia `request` para poder usarlo en la vista. Al obtener el usuario, si este no existe, la queryset puede petar, así que por eso hay que usar `get_or_create`.

```python
from .forms import UserCreationFormWithEmail
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django import forms
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView
from .models import Profile


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationFormWithEmail
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

    def get_form(self, form_class=None):
        form = super(SignUpView, self).get_form()
        # Customización en tiempo real
        form.fields['username'].widget = forms.TextInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Nombre de usuario'})
        form.fields['email'].widget = forms.EmailInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Email'})
        form.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Contraseña'})
        form.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Repite la contraseña'})
        return form


@method_decorator(login_required, name='dispatch')
class ProfileUpdate(UpdateView):
    model = Profile
    fields = ['avatar', 'bio', 'link']
    success_url = reverse_lazy('profile')
    template_name = 'registration/profile_form.html'

    def get_object(self):
        # Obtener (o crear si no existe) el objeto a editar
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

```

En el template, para poder ver el url de la imagen del avatar tienes que usar esto en el formulario

```html
 <form action="" method="post" enctype="multipart/form-data">{% csrf_token %}
```

### Customizando formulario de Perfil

`<app>/forms.py` -> Debes de importar el modelo. Crear un formulario que herede de `forms.ModelForm`. Dentro crear su clase `Meta` con el modelo, los campos y sus widgets para modificarlos.

```python
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile


class UserCreationFormWithEmail(UserCreationForm):
    email = forms.EmailField(
        required=True,
        help_text='Requerido, 254 caracteres como máximo y que sea válido')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('El email ya existe, usa otro.')
        return email


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'bio', 'link']
        widgets = {
            'avatar': forms.ClearableFileInput(attrs={
                'class': 'form-control-file mt-3'
            }),
            'bio': forms.Textarea(attrs={
                'class': 'form-control mt-3',
                'rows': 3,
                'placeholder': 'Biografia'
            }),
            'link': forms.URLInput(attrs={
                'class': 'form-control mt-3',
                'placeholder': 'Enlace'
            }),
        }

```

`<app>/views.py` -> Importa el formulario nuevo y cambia el atributo `model` por el de `form_class`, poniendole el formulario. El campo `fields` ya no es necesario pues está en el formulario.

```python
from .forms import UserCreationFormWithEmail, ProfileForm

# ...

@method_decorator(login_required, name='dispatch')
class ProfileUpdate(UpdateView):
    form_class = ProfileForm
    success_url = reverse_lazy('profile')
    template_name = 'registration/profile_form.html'

    def get_object(self):
        # Obtener (o crear si no existe) el objeto a editar
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile

```

`<app>/templates/<app>/<template_name>` -> Modifica el formulario a pelo a tu gusto. En este ejemplo se ha puesto una imagen por defecto `no-avatar.jpg` en `<app>/static/<app>/img/no-avatar.jpg` para cuando el usuario no tenga, o borre la imagen, aparezca esta.

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Perfil{% endblock %}
{% block content %}
<style>.errorlist{color:red;} label{display:none}</style>
<main role="main">
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-9 mx-auto mb-5">
        <form action="" method="post" enctype="multipart/form-data">{% csrf_token %}
          <div class="row">
            <!-- Previa del avatar -->
            <div class="col-md-2">
              {% if request.user.profile.avatar %}
                <img src="{{request.user.profile.avatar.url}}" class="img-fluid">
                <p class="mt-1">¿Borrar? <input type="checkbox" id="avatar-clear" name="avatar-clear" /></p>
              {% else %}
              <img src="{% static 'registration/img/no-avatar.jpg' %}" class="img-fluid">
              {% endif %}
            </div>
            <!-- Formulario -->
            <div class="col-md-10">
              <h3>Perfil</h3>
              <input type="file" name="avatar" class="form-control-file mt-3" id="id_avatar">
              {{ form.bio }}
              {{ form.link }}
              <input type="submit" class="btn btn-primary btn-block mt-3" value="Actualizar">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

### Email editable

Como es solo un campo, y para no tener que destrozar los modelos de formularios y vistas que ya estamos usando, lo mejor es que hagas un formulario solo para este campo.

`<app>/templates/<app>/<template_perfil>` -> Añades un enlace para editar el email.

```python

```

`<app>/forms.py` -> Creas el nuevo formulario `EmailForm` basándote en uno anterior. Ahora lo que vas a recuperar es un objeto que ya existe y que debe permitir cambiarlo si no existe el nuevo valor.

```python
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile


class UserCreationFormWithEmail(UserCreationForm):
    email = forms.EmailField(
        required=True,
        help_text='Requerido, 254 caracteres como máximo y que sea válido')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('El email ya existe, usa otro.')
        return email


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['avatar', 'bio', 'link']
        widgets = {
            'avatar': forms.ClearableFileInput(attrs={
                'class': 'form-control-file mt-3'
            }),
            'bio': forms.Textarea(attrs={
                'class': 'form-control mt-3',
                'rows': 3,
                'placeholder': 'Biografia'
            }),
            'link': forms.URLInput(attrs={
                'class': 'form-control mt-3',
                'placeholder': 'Enlace'
            }),
        }


class EmailForm(forms.ModelForm):
    email = forms.EmailField(
        required=True,
        help_text='Requerido, 254 caracteres como máximo y que sea válido')

    class Meta:
        model = User
        fields = ['email']

    def clean_email(self):
        email = self.cleaned_data['email']
        if 'email' in self.changed_data:
            if User.objects.filter(email=email).exists():
                raise forms.ValidationError('El email ya existe, usa otro.')
        return email

```

`<app>/views.py` -> Creas su vista `EmailUpdate` y lo obtienes (el email) de la propia `request`.

```python
from .forms import UserCreationFormWithEmail, ProfileForm, EmailForm
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django import forms
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView
from .models import Profile


# Create your views here.
class SignUpView(CreateView):
    form_class = UserCreationFormWithEmail
    template_name = 'registration/signup.html'

    def get_success_url(self):
        return reverse_lazy('login') + '?register'

    def get_form(self, form_class=None):
        form = super(SignUpView, self).get_form()
        # Customización en tiempo real
        form.fields['username'].widget = forms.TextInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Nombre de usuario'})
        form.fields['email'].widget = forms.EmailInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Email'})
        form.fields['password1'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Contraseña'})
        form.fields['password2'].widget = forms.PasswordInput(
            attrs={'class': 'form-control mb2',
                   'placeholder': 'Repite la contraseña'})
        return form


@method_decorator(login_required, name='dispatch')
class ProfileUpdate(UpdateView):
    form_class = ProfileForm
    success_url = reverse_lazy('profile')
    template_name = 'registration/profile_form.html'

    def get_object(self):
        # Obtener (o crear si no existe) el objeto a editar
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


@method_decorator(login_required, name='dispatch')
class EmailUpdate(UpdateView):
    form_class = EmailForm
    success_url = reverse_lazy('profile')
    template_name = 'registration/profile_email_form.html'

    def get_object(self):
        # Obtener el objeto a editar
        return self.request.user

```

`<app>/urls.py` -> Creas su endpoint / url asociada a su vista.

```python
from django.urls import path
from .views import SignUpView, ProfileUpdate, EmailUpdate

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('profile/', ProfileUpdate.as_view(), name='profile'),
    path('profile/email/', EmailUpdate.as_view(), name='profile_email'),
]

```

`<app>/templates/<app>/template_name` -> Por último creas la template.

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Email{% endblock %}
{% block content %}
<style>.errorlist{color:red;} label{display:none}</style>
<main role="main">
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-9 mx-auto mb-5">
        <form action="" method="post">{% csrf_token %}
          <h3 class="mb-4">Email</h3>
          {{form.as_p}}
          <p><input type="submit" class="btn btn-primary btn-block" value="Actualizar"></p>
        </form>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

### Contraseña Editable

Al igual que sucedía anteriormente cuando querías cambiar la contraseña (Recuperar Contraseña), Django tiene urls de Admin para editar la contraseña. Tu vas a usar:

* `password_change/` -> Vista con nombre `password_change` y template que usa un formulario `password_change_form-html`.
* `password_change/done` -> Vista con nombre `password_change_done` y template `password_change_done.html`.

Solo tienes que crear estos dos templates

`<app>/templates/<app>/password_change_form.html`

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Cambio de contraseña{% endblock %}
{% block content %}
<style>.errorlist{color:red;}</style>
<main role="main">
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-9 mx-auto mb-5">
        <form action="" method="post">{% csrf_token %}
            <h3 class="mb-4">Cambio de contraseña</h3>
            <p>Por favor, introduzca su contraseña antigua por seguridad, y después introduzca dos veces la nueva contraseña para verificar que la ha escrito correctamente.</p>
            {{form.old_password.errors}}
            <p><input type="password" name="old_password" autofocus="" required="" id="id_old_password"class="form-control" placeholder="Contraseña antigua"></p>
            {{form.new_password1.errors}}
            <p><input type="password" name="new_password1" required="" id="id_new_password1" class="form-control" placeholder="Contraseña nueva"></p>
            {{form.new_password2.errors}}
            <p><input type="password" name="new_password2" required="" id="id_new_password2" class="form-control" placeholder="Contraseña nueva (confirmación)"></p>
            <p><input type="submit" class="btn btn-primary btn-block" value="Cambiar mi contraseña"></p>
        </form>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

`<app>/templates/<app>/password_change_done.html`

```html
{% extends 'core/base.html' %}
{% load static %}
{% block title %}Contraseña cambiada correctamente{% endblock %}
{% block content %}
<main role="main">
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-9 mx-auto mb-5">
        <h3 class="mb-4">Contraseña cambiada correctamente</h3>
        <p>Puedes volver a tu perfil haciendo clic <a href="{% url 'profile' %}">aquí</a>.</p>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

## Señales

...

## Tests

...
