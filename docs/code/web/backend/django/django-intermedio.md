# Django Intermedio

TODO

## Relación entre modelos

Los modelos se pueden conectar, a través de las claves foráneas, con dos tipos de relaciones:

* One-To-Many -> Uno a muchos
  * Relacionas un campo de una tabla con varias tablas.
* Many-To-Many -> Machos a muchos
  * Relacionas varios campos de una tabla con varias tablas.

Ejemplo de una one-to-many con el proyecto anterior. Creamos una app `blog` que va a contener dos modelos, uno categoría y otro post:

* Cada post solo tiene un autor, pero cada autor (usuario) puede tener varias entradas (one-to-many).
  * Si se elimina a un autor, se deben de eliminar todos sus post (en cascada).
  * Cuando la relación es one-to-many se usa un campo `ForeignKey` (clave foránea).
  * La relación one-to-many es `User`-`Post`.
* Cada post podrá tener varias categorías, y cada categoría puede estar en varios post (many-to-many).
  * Cuando la relación es many-to-many se usa un campo `ManyToManyField`
  * La relación many-to-many es `Category`-`Post`.

Así que el `models.py` quedaría

```python
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nombre')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creado')
    updated = models.DateTimeField(auto_now=True, verbose_name='Actualizado')

    class Meta:
        verbose_name = 'categoría'
        verbose_name_plural = 'categorias'
        ordering = ['-created']

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name='Título')
    content = models.TextField(verbose_name='Contenido')
    published = models.DateTimeField(default=now,
                                     verbose_name='Publicado')
    image = models.ImageField(upload_to='blog', null=True, blank=True,
                              verbose_name='Imagen')
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Autor')
    categories = models.ManyToManyField(Category, related_name='get_posts',
                                        verbose_name='Categorías')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creado')
    updated = models.DateTimeField(auto_now=True, verbose_name='Actualizado')

    class Meta:
        verbose_name = 'entrada'
        verbose_name_plural = 'entradas'
        ordering = ['-created']

    def __str__(self):
        return self.title

```

## Personalizar el Admin

El Admin permite ser customizado, para poder tener una mejor UX. Todos los cambios para que surtan efecto tendrán que estar hechos en el `admin.py`, ya sea del proyecto o de cada apps.

### Añadir más columnas

Igual que teníamos el campo `readonly_fields` para mostrar campos ocultos, existe otro comando `list_display`, al cual se le pasa una tupla con todos las columnas/campos que queremos tener.

### Ordenar columnas

Para poder ordenador columnas se usa `ordering`, donde se le pasa una tupla donde se ordena en función de izquierda a derecha (por ejemplo, primero por autor, luego por fecha de publicación, etc).

### Formulario de búsqueda

Con `search_fields` y una tupla con los campos. Hay que tener cuidado porque por ejemplo, si un campo en realidad se busca por subcampos que tiene dentro, hay que especificarlo y sino dará error. Por ejemplo, si quiero buscar por autor, en realidad quiero buscar por su usuario. O si quiero buscar por categorías, lo que quiero encontrar es el nombre de la categoŕia. La nomemclatura es `<campos>__<subcampo>` (2 barras bajas). Por ejemplo:

```python
ordering =('author__username', 'categories__name')
```

### Campos con fechas

Para los campos `datetime` y similares, hay que definir una jerarquía de fechas con `date_hierarchy` y la tupla con los campos.

### Filtros de búsqueda

Para filtrar por campos se usa `list_filter` seguida de la tupla de campos.

#### Crear campos propios para los filtros

Hay campos que pueden dar problemas, por ejemplo los many-to-many. Para eso, se crea una función auxiliar que devuelva lo que realmente quiero. Luego reescribo el método `short_description` pasándole el nombre del nuevo campo.

En la siguiente sección hay un ejemplo final donde se ve esto en el `post_categories()`.

### Ejemplo con todo

Ejemplo en el `admin.py` de un blog:

```python
from django.contrib import admin
from .models import Category, Post


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
    list_display = ('title', 'author', 'published', 'post_categories')
    ordering = ('author', 'published')
    search_fields = ('title', 'content', 'author__username',
                     'categories__name')
    date_hierarchy = 'published'
    list_filter = ('author__username', 'categories__name',)

    def post_categories(self, obj):
        return ', '.join(
            [c.name for c in obj.categories.all().order_by('name')])
    post_categories.short_description = 'Categorias'


admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)

```

## Filtros / opciones en los template tags

En los template tags se le pueden añadir funcionalidades a las variables que se ponen, la forma es

```django
{{<mivariable>|<filtro>}}
```

### Formatear fechas

Por ejemplo para poner un campo fecha en format `DD/MM/YYYY` podríamos hacer

```html
{{post.published|date:"SHORT_DATE_FORMAT"}}
```

### Añadir saltos de línea

```html
{{post.content|linebreaks}}
```

### Bucles for - primera y última iteración

Supongamos que queremos sacar todas las catergorías de un post. Esto es una relación many-to-many. Si uso

```html
{{post.categories}}
```

Devuelve `None`, porque la query no se ejecuta. Para que esto no pase haríamos

```html
{{post.categories.all}}
```

Pero esto devuele algo que no es legible, lo lógico sería usar un bucle for así

```html
{% for category in post.categories.all %}
  {{category.name}}
{% endfor %}
```

Lo que pasa que esto no los pone separados por coma. Y si pongo la coma en el bucle, también la va a poner en el último elemento. Para que eso no pase existe un campo `forloop`, que cuenta entre otras cosas con dos variables `forloop.first` y `forloop.last`. Así que ahora podríamos hacer


```html
{% for category in post.categories.all %}
  {{category.name}}{% if not forloop.last %}, {% end if%}
{% endfor %}
```

## Pasar parámetros a las vistas

Todos los parámetros que se pasan en la url, se toman como `string`, pero se pueden formatear. Si se manda un parámetro que no existe, debemos lanzar un `404`.

Ejemplo:

* En el `urls.py`

  ```python
  from django.urls import path
  from . import views
  
  
  urlpatterns = [
      path('', views.blog, name='blog'),
      path('category/<int:category_id>', views.category, name='category'),
  ]
  
  ```

* En el `views.py`

  ```python
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
  
  ```

## Buscar inversamente en relaciones

Cuando se tiene una relación entre campos, se puede buscar tanto en un sentido como en otro. Veámoslo con un ejemplo:

* Tenemos `Post` relacionado many-to-many con `Category`.
* Si quiera buscar todos los post que hay en una categoria podría
  1. Buscar por cada post y filtrar por categoría.
  2. Buscar por categoría y sacar todos los posts
* La segunda opción de búsqueda es más eficiente y para hacerla tendría que hacer

  ```html
  {{category.post_set.all}}
  ```

* Pero esta forma queda bastante poco intuitiva.
* Para customizar esto usamos el campo `related_name` en el modelo del `models.py`

  ```python
  class Post(models.Model):
      categories = models.ManyToManyField(Category, related_name="get_posts")
  ```

* Y ahora en el template

  ```html
  {{category.get_posts.all}}
  ```

## Procesador de contexto

El contexto en programación se refiere al estado de variables, objetos, etc, y su estado, que hay en un momento concreto. Cuando procesamos una vista, hasta ahora lo que devolvemos es la función `render` a la que se le pasa:

1. La request -> Que no deja de ser un objeto / variable que contiene información sobre la petición http.
2. El template -> El html (y css+js+media) que tiene que cargar.
3. El contexto -> Es un diccionario con variables que le pasamos para que puedan ser usadas en el template.

Hay veces en las que se necesita información de una app en distintas apps. Una buena manera es extender el contexto, añadiendo esa info de una app para poder ser consumida en las demás. Para hacer eso, usamos lo que se llama el **Procesador de contexto**. Para crear uno hacemos:

1. En la app de la que queremos compartir su información, creamos un archivo llamado `processors.py`.
  1. Creamos dentro una función, a la que se le pasa la `request` como parámetro.
  2. Dentro creamos un diccionario con información.
  3. Devolvemos ese diccionario.
2. En el `settings.py` debemos de darlo de alta.
  1. Vamos a la sección `TEMPLATES`.
  2. Dentro de está `OPTIONS`, y dentro de esta se encuentra `context_processors`.
  3. Añadimos lo siguiente `'<app>.processors.<funcion>'`.

Esto se ve más fácil con un ejemplo, donde vamos a añadir las RRSS a una web. Todas las RRSS están en una app `social`

1. Crear app `social` y darla de alta en el `settings.py`
2. Modificar su `models.py`.

  ```python
  from django.db import models


  # Create your models here.
  class Link(models.Model):
      key = models.SlugField(verbose_name='Nombre clave', max_length=100,
                             unique=True)
      name = models.CharField(verbose_name='Red social', max_length=200)
      url = models.URLField(verbose_name='Enlace', max_length=200, null=True,
                            blank=True)
      created = models.DateTimeField(auto_now_add=True, verbose_name='Creado')
      updated = models.DateTimeField(auto_now=True, verbose_name='Actualizado')

      class Meta:
          verbose_name = 'enlace'
          verbose_name_plural = 'enlaces'
          ordering = ['name']

      def __str__(self):
          return self.name
  ```

3. Modificar el `admin.py`, hacer las migraciones y migrarlas

  ```python
  from django.contrib import admin
  from .models import Link


  # Register your models here.
  class LinkAdmin(admin.ModelAdmin):
      readonly_fields = ('created', 'updated')


  admin.site.register(Link, LinkAdmin)

  ```

4. Como no hay vista, ni template pasamos directamente a la fase de procesador de contexto.
5. Crear el `processor.py`

  ```python
  from .models import Link


  def ctx_dict(request):
      ctx = {}
      for link in Link.objects.all():
          ctx[link.key] = link.url
      return ctx

  ```

6. Darlo de alta en el `settings.py`
7. Arrancar el server, entrar al Admin y crear un par de objetos con por ejemplo las claves LINK_FACEBOOK, LINK_TWITTER y LINK_INSTAGRAM.
8. Modificar el `base.html`

  ```html
  <!-- Pié de página -->
    <footer class="footer text-faded text-center py-5">
      <div class="container">
        <p class="m-0">
          {% if LINK_TWITTER %}
            <a href="{{LINK_TWITTER}}" class="link">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          {% endif %}
          {% if LINK_FACEBOOK %}
            <a href="{{LINK_FACEBOOK}}" class="link">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          {% endif %}
          {% if LINK_INSTAGRAM %}
            <a href="{{LINK_INSTAGRAM}}" class="link">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          {% endif %}
      </p>
        <p class="m-0 mbt">
          <a href="{% url 'sample' %}" class="link">Política de privacidad</a> ·
          <a href="{% url 'sample' %}" class="link">Aviso legal</a> ·
          <a href="{% url 'sample' %}" class="link">Cookies</a>
    </p>
        <p class="m-0 mbt1">&copy; La Caffettiera 2018</p>
      </div>
  </footer>
  ```

## Template Tags propios

Es una alternativa al Procesador de Contexto más flexible, pero también consume más recursos:

1. En la app que su información sea compartida hay que crear:
  1. Carpeta `templatetags`
  2. Dentro un `__init__.py`
  3. Un fichero python, `ficherotags.py`, para los template tags .
2. El `ficherotags.py` debe contener los template de django y el modelo de páginas

  ```python
  from django import template
  from page.models import Page
  ```

3. Luego hay que crear un registro de la librería de templates

  ```python
  register = template.Library()
  ```

4. Ahora creamos una función, `<nuevotag>`, con el decorador `@register.simple_tag`.
5. En esa función vamos a poder jugar con las páginas, con por ejemplo `Page.objects.all()`
6. Para poder usar `<nuevotag>` en un template hay que cargar el fichero `ficherotags.py`.

Ejemplo:

1. Tenemos los típicos links en el footer sobre las cookies y demás.
2. Creamos una app `pages`
3. `models.py`

  ```python
  from django.db import models


  # Create your models here.
  class Page(models.Model):
      title = models.CharField(verbose_name='Título', max_length=200)
      content = models.TextField(verbose_name='Contenido')
      created = models.DateTimeField(auto_now_add=True, verbose_name='Creado')
      updated = models.DateTimeField(auto_now=True, verbose_name='Actualizado')

      class Meta:
          verbose_name = 'página'
          verbose_name_plural = 'páginas'
          ordering = ['title']

      def __str__(self):
          return self.title

  ```

4. `views.py`

  ```python
  from django.shortcuts import render, get_object_or_404
  from .models import Page


  # Create your views here.
  def page(request, page_id):
      page = get_object_or_404(Page, id=page_id)
      template = 'pages/sample.html'
      context = {'page': page}
      return render(request, template, context)

  ```

5. `urls.py`

  Proyecto

  ```python
  from django.urls import path, include

  urlpatterns = [
      ...
      # Path del pages
      path('page/', include('pages.urls')),
      ...
  ]
  ```

  App pages

  ```python
  from django.urls import path
  from . import views


  urlpatterns = [
      ...
      path('<int:page_id>/', views.page, name='page'),
      ...
  ]

  ```

6. `pages/templatetags/pages_extra.py`

  ```python
  from django import template
  from pages.models import Page

  register = template.Library()


  @register.simple_tag
  def get_page_list():
      pages = Page.objects.all()
      return pages

  ```

7. `core/templates/core/base.html`

  ```html
  {% load pages_extras %}
  {% get_page_list as page_list %}
  {% for page in page_list %}
    <a href="{% url 'page' page.id %}" class="link">{{page.title}}</a> {% if not forloop.last %}.{% endif %}
  {% endfor %}
  ```

## Ordenación directa de páginas

Si quisiera dar cierto orden a un tipo de elementos de una app, debemos de:

1. En el `models.py` añadir un campo por ejemplo

  ```python
  class Page(models.Model):
    ...
    order = models.SmallIntegerField(verbose_name='Orden', default=0)

    class Meta:
      ordering = ['order']

  ```

2. En el `admin.py`

  ```python
  class PageAdmin(models.ModelAdmin):
    ...
    list_display('order')
  ```

3. Ahora en el Admin puedo administrar pesos para obtener esa ordenación.

## Edición directa de páginas

En el propio procesador de contexto contamos con el usuario de la sesión en `django.contrib.auth.context_processors.auth`. Así que si queremos que ciertas partes aparezcan si un usuario está autenticado, podemos hacer en el template base

```html
{% if user.is_authenticated %}
  <p><a href="{% url 'admin:<app>_<modelo>_<accion>' <objeto-id>%}">Editar</a></p>
{% endif %}
```

Con el ejemplo anterior sería `base.html`

```html
{% if user.is_authenticated %}
  <p><a href="{% url 'admin:pages_page_change' page.id %}">Editar</a></p>
{% endif %}
```

## Editor WYSIWYG en el Admin

Para añadir un editor wysiswyg en el Admin podemos usar el `ckeditor`

1. Instalar `ckeditor`

  ```bash
  pip install django-ckeditor
  ```

2. Añadirlo en las apps instaladas -> `settings.py`

  ```python
  INSTALLED_APPS = [
      ...
      'ckeditor',
  ]
```

3. En el `models.py` de la app donde queremos tener el campo con el editor:
  1. Importamos `ckeditor.fields.RichTextField`
  2. Modificamos el campo deseado
  3. Hacemos las migraciones

  ```python
  ...
  from ckeditor.fields import RichTextField


  class Page(models.Model):
    ...
    content = RichTextField(verbose_name='Contenido')
  ```

Si queremos redefinir la barra del editor, en el `settings.py` al final añadimos

```python
# Ckeditor
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Basic',
    }
}
```

El modo `'Basic'` es el más simple, pero podemos poner `None` si queremos tener todas las opciones.

Repo Oficial -> [aquí](https://github.com/django-ckeditor/django-ckeditor)  
Docu Oficial -> [aquí](https://django-ckeditor.readthedocs.io/en/latest/)

En su repo nos viene de ejemplo esto

```python
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Custom',
        'toolbar_Custom': [
            ['Bold', 'Italic', 'Underline'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['RemoveFormat', 'Source']
        ]
    }
}
```

Para que el contenido creado en el editor se vea sin problemas en el template, tenemos que ponerle el filtro `safe` al tag donde esté este contenido. En el ejemplo anterior en `miproyecto/pages/templates/pages/sample.html`

```html
{{page.content|safe}}
```

## Formularios

Para usar formularios en una app:

1. Crear en la app `forms.py`
2. Al igual que con los modelos:
  1. Importamos el "modelo" -> `from django import forms`
  2. Creamos una clase que herede del "modelo" -> `class MiClaseForm(forms.Form):`
  3. Generamos los campos del formulario, por ejemplo

    ```python
    name = forms.CharField(label='Nombre', required=True)
    email = forms.EmailField(label='Email', required=True)
    content = forms.CharField(label='Contenido', required=True, widget=forms.Textarea)
    ```

3. En el `views.py` importamos el o los formularios, y los añadimos al contexto de la vista.

  ```python
  from django.shortcuts import render
  from .forms import MiClaseForm


  def mivista(request):
    template = 'miapp/miapp.html'
    context = {
        'form': MiClaseForm(),
    }
    return render(request, template, context)

```

4. En el template lo dibujamos:
  * Simplemente con `{{form}}` ya lo saca, pero totalmente desformateado.
  * Podemos darle un formato más como párrafos `{{form.as_p}}`.
  * Como si fuera una lista

    ```html
      <ul>
        {{form.as_ul}}
      </ul>
    ```

  * Como una tabla

    ```html
      <table>
          {{form.as_table}}
      </table>
    ```

5. Para añadirle el botón de enviar:

  1. Metemos el formulario dentro de un `<form>`
  2. En el parámetro `action` será la web donde ir / acción a hacer cuando se envíe  el formulario
  3. En el `method` el método para enviar el formulario:
    * `POST` es el más recomendado.
    * `GET` no se recomienda.
  4. Dentro introducimos:
    1. Al principio `{% csrf_token %}` por motivos de seguridad.
    2. Al final un `<input>`:
      * Con `type="submit"`
      * Y un texto a mostrar `value="Enviar"`.

6. Validar si el formulario es correcto:
  1. En la misma vista del `views.py` miramos si accedemos con POST con `request.method == 'POST'`
  2. Recupero el formulario con `mi_formulario = MiClaseForm(data=request.POST)`
  3. Compruebo si es valido con `mi_forumulario.is_valid()`
  4. Formateo los valores por defecto si alguno está vacío
  5. Hago una redirección con la función `django.shortcuts.redirect`
    * Se recomiendo usar la función `django.urls.reverse` para la redirección

Ejemplo de la app `contact`:

* `forms.py`

  ```python
  from django import forms


  class ContactForm(forms.Form):
      name = forms.CharField(label='Nombre', required=True)
      email = forms.EmailField(label='Email', required=True)
      content = forms.CharField(label='Contenido', required=True,
                                widget=forms.Textarea)

  ```

* `views.py`

  ```python
  from django.shortcuts import render, redirect
  from django.urls import reverse
  from .forms import ContactForm


  # Create your views here.
  def contact(request):
      if request.method == 'POST':
          contact_form = ContactForm(data=request.POST)
          if contact_form.is_valid():
              name = request.POST.get('name', '')
              email = request.POST.get('email', '')
              content = request.POST.get('content', '')
              return redirect(reverse('contact') + '?OK')
      template = 'contact/contact.html'
      context = {
          'form': ContactForm(),
      }
      return render(request, template, context)

  ```

* `contact.html`

  ```html
  <!-- Formulario de contacto -->
  {% if 'OK' in request.GET %}
      <p><strong>Su mensaje se ha reenviado correctamente</strong></p>
  {% endif %}
  <form action="" method="POST">
      {% csrf_token %}
      <table>
          {{form.as_table}}
      </table>
      <input type="submit" value="Enviar">
  </form>
  ```

### Maquetar formulario

Para poder dar un aspecto visual propio a un formulario es muy sencillo:

1. Tenemos que volver a tener en nuestro `form`:
  1. Sus parámetros `action` + `method`
  2. El `{% csrf_token %}` al principio
  3. El `<input type='submit' value='Enviar'>` al final  
2. En cada campo:
  1. Poner el campo del formulario
  2. Añadirle despues al final el `{{form.<campo>.errors}}`
3. Modificar los estilos de cada campo en el `forms.py`:
  * Dentro de cada campo modificamos el parámetro `widget`.
    * A este se le pasa un tipo de campo
      * Dentro de este tipo, generamos los elementos CSS dentro del diccionario `attrs`.
  * Podemos ajustar también el tamaño con `min_length` o `max_length`.

Ejemplo

* `contact.html` app contact

  ```html
  <!-- Formulario de contacto -->
  {% if 'OK' in request.GET %}
      <p><strong>Su mensaje se ha reenviado correctamente</strong></p>
  {% endif %}
  <form action="" method="POST">
      {% csrf_token %}
      <div class="form-group">
          <label>Nombre *</label>
          <div class="input-group">
              {{form.name}}
          </div>
          {{form.name.errors}}
      </div>
      <div class="form-group">
          <label>Email *</label>
          <div class="input-group">
              {{form.email}}
          </div>
          {{form.email.errors}}
      </div>
      <div class="form-group">
          <label>Mensaje *</label>
          <div class="input-group">
              {{form.content}}
          </div>
          {{form.content.errors}}
      </div>
      <div class="text-center">
          <input type="submit" class="btn btn-primary btn-block py-2" value="Enviar">
      </div>
  </form>
  ```

* `forms.py` app contact

  ```python
  from django import forms


  class ContactForm(forms.Form):
      name = forms.CharField(label='Nombre', required=True,
                             widget=forms.TextInput(
                                 attrs={
                                     'class': 'form-control',
                                     'placeholder': 'Escribe tu nombre'
                                 }
                             ), min_length=3, max_length=100)
      email = forms.EmailField(label='Email', required=True,
                               widget=forms.EmailInput(
                                   attrs={
                                       'class': 'form-control',
                                       'placeholder': 'Escribe tu email'
                                   }
                             ), min_length=3, max_length=100)
      content = forms.CharField(label='Contenido', required=True,
                                widget=forms.Textarea(
                                    attrs={
                                        'class': 'form-control',
                                        'rows': 3,
                                        'placeholder': 'Escribe tu mensaje'
                                    }
                                ), min_length=10, max_length=1000)

  ```

## Enviar emails

Para poder enviar emails hay configurar el correo, y existen muchas opciones. 

En este ejemplo para pruebas uso [mailtrap.io](mailtrap.io). Dentro de la `demo_inbox` podemos buscar la configuración para Django. La copiamos y la pegamos al final del `settings.py`

```python
# Email config
EMAIL_HOST = 'smtp.mailtrap.io'
EMAIL_HOST_USER = '9e9652ad27c050'
EMAIL_HOST_PASSWORD = 'a4e2f4e19b02dc'
EMAIL_PORT = '2525'
```

Para enviar el correo, el `views.py` de la app correspondiente:

1. Importamos la `django.core.mail.EmailMessage`
2. Dentro de esta tenemos que poner:
  1. Asunto
  2. Cuerpo
  3. Email de origen
  4. Email de destino
  5. `reply_to=[<objeto-EmailMessage>]`

Ejemplo con `views.py` de la app Contact anterior

```python
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
                'MiAppDjango: Hola',
                f'De {name} <{email}>\n\nEscribio:\n\n{content}',
                'noreply@inbox.mailtrap.io',
                ['tuemail@email.com'],
                reply_to=[email]
            )
            try:
                mail.send()
            except:
                return redirect(reverse('contact') + '?FAIL')
            else:
              return redirect(reverse('contact') + '?OK')
                
    template = 'contact/contact.html'
    context = {
        'form': ContactForm(),
    }
    return render(request, template, context)

```

## Grupos, Usuarios y permisos

Todo se hace desde el Admin y es muy intuitivo.

Lo lógico es crear primero un grupo con unos permisos concretos (app que puede ver, editar, borrar).

Luego se crea un usuario con su nombre y contraseña. Si queremos que pueda acceder al admin debemos añadirlo como `staff`.

Por último para ver si todo funciona, accedemos al admin con el nuevo usuario.

Si hay campos que queremos que aparezcan como solo lectura para cierto grupo, podemos editar el `admin.py` de la app con:

1. Creamos el método `def get_readonly_fields(self, request, obj=None)`
2. Dentro filtramos si el usuario pertenece a un grupo o no
  * Si pertenece a un grupo devolvemos unos readonly
  * Si no pertenece devolvemos otros

Ejemplo:

* Para una app `social` hemos creado un grupo llamado `Personal`.
* No queremos que pueda editar los campos `key` y `name` que usaremos para las RRSS.
* Su `admin.py` queda como

  ```python
  from django.contrib import admin
  from .models import Link


  # Register your models here.
  class LinkAdmin(admin.ModelAdmin):
      readonly_fields = ('created', 'updated')

      def get_readonly_fields(self, request, obj=None):
          if request.user.groups.filter(name='Personal').exists():
              return ('created', 'updated', 'key', 'name')
          else:
              return ('created', 'updated')


  admin.site.register(Link, LinkAdmin)

  ```

* Hacemos las migraciones.
