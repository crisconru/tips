# Django Principiante

TODO:

Vamos a ver como empezar con Django a través de un mini ejemplo.

## Crear proyecto Django

Instalamos Django

```bash
pip install django
```

## Django CLI

Django tiene un CLI (menu de comandos) llamado `django-admin` que es con el que se trabaja. Desde una terminal donde este Django instalado lo ejecutamos y salen todas las opciones que tiene

```bash
django-admin
```

## Crear Proyecto

Para crear nuestro primer proyecto hacemos

```bash
django-admin startproject <proyecto>
```

Veremos que se ha generado una con la siguiente estructura (supongamos que he llamado al proyecto `miproyecto`):

* miproyecto -> Proyecto Django
    * miproyecto -> App principal del proyecto, contiene configuracion inicial y despliegue.
        * __init__.py -> Para inicializar el proyecto e indicar que es un paquete.
        * settings.py -> Toda la configuración del proyecto Django.
        * urls.py -> Punto de entrada de todas nuestras peticiones http (ver una web, consumir un webservice, etc).
        * wsgi.py -> Encargado del despliegue (implementar el protocolo WSGI que usan todas las apps webs hechas en Python).
    * manage.py -> Script para gestionar el proyecto desde la terminal.

El otro CLI con el que cuenta Django es ese último fichero llamado `manage.py`. Si lo ejecutamos en la terminal tal cual, veremos todas las opciones que tiene (ordenadas ademas por temáticas). 

### Lanzar servidor

Si ejecutamos ahora el comando

```bash
python manage.py runserver
```

Veremos como ha arrancado un servidor de pruebas para poder ver desde el navegador (http://127.0.0.1:8000) nuestro proyecto Django. Para pararlo es tan fácil como usar Ctrl+C

### Sincronizar BBDD -> Migraciones

Una vez arrancado, necesitamos generar las bases de datos y demás. Paramos el servidor y hacemos

```bash
python manage.py migrate
```

## Primera app -> Core

Un proyecto Django está compuesto por muchas apps. Todas estas apps son independientes y pueden compartir recursos. Aparte de la app principal, la que se llama igual que el proyecto, se suele crear otra "central" llamada **CORE**.

Para crear una app se hace

```bash
python manage.py startapp <app>
```

En este caso creamos `core`, y al hacerlo se crea una carpeta `core` con los siguientes ficheros:

* core
    * migrations -> Carpeta donde se guardan los cambios del modelo de la bbdd
    * __init__.py -> Definir paquete
    * admin.py -> Fichero encargado de la configuracion de la app en el Django Admin
    * apps.py -> Configuracion de la app.
    * models.py -> Es donde se definen el modelo de la bbdd para la app.
    * tests.py -> Fichero de pruebas.
    * views.py -> Es donde se definen las Vistas (las funciones / clases que se ejecutan cuando se accede a una url).

## Vistas

Cada vez que marca una url en el navegador, el proceso que sigue Django para ofrecer la web es el siguiente:

1. Se entra al fichero `urls.py` de la app principal del proyecto (la que se llama como el propio proyecto).
2. En ese fichero se busca en que vista despacha esa url.
    1. Puede haber una vista definida.
    2. Puede haber una redicción a otro fichero `urls.py` de la app encargada de despachar esa vista.
3. Dentro del `urls.py` final se indica que vista del `views.py` de la app ejecuta.
4. En el `views.py` de la app se ejecuta la vista correspondiente y se devuelve la respuesta para el navegador.

Existen 2 tipos de vistas:

* Function views -> El encargado de generar la vista es una función.
    * Son para vistas que apenas tienen operaciones, más simples.
* Class-based views -> El encargado de generar la vista es una clase.
    * Son para vistas mas complejas.
    * Son las más usadas.

### Ejemplo de como se carga una vista en el navegador

Un ejemplo donde se pasa por `urls.py` de **miproyecto** que redirecciona al `urls.py` de **core** y despacha la function view **home**:

miproyecto -> urls.py

```python
from django.urls import path, include

urlpatterns = [
    # Path del core
    path('', include('core.urls')),
]
```

core -> urls.py

```python
from django.urls import path
from core import views

urlpatterns = [
    path('', views.home, name='home'),
]
```

core -> views.py

```python
from django.shortcuts import HttpResponse


def home(request):
    return HttpResponse('<h1>Vista home</h1>')
```

## Templates

En el ejemplo anterior poníamos código HTML, ***a pelo***, para generar las vistas. Esto no es ni óptimo ni escalable. Lo normal es usar plantillas HTML / templates, que son ficheros HTML que se van a usar para generar cada vista.

Para usar templates en una app hay que crear dentro de la app:

1. Carpeta **templates**.
2. Dentro de esta otra carpeta que se llama igual que la app.

Es decir que en **core** tendríamos

* miproyecto
    * core
        * templates
            * core

Esto se hace así porque Django cuando se despliega el proyecto, busca todas las carpetas **templates** dentro de cada app y mete lo que haya dentro en una carpeta **templates** genérica para él.

Supongamos que hemos creado el fichero **home.html** en el directorio **miproyecto/core/templates/core**, la forma de despacharlo en **views.py** de **core** se hace:

1. Poner la app **core** en el `settings.py` del proyecto Django

    ```python
    # Application definition

    INSTALLED_APPS = [
        'core.apps.CoreConfig',
        'portfolio.apps.PortfolioConfig',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    ]
    ```

2. Modificar el **views.py** con

    ```python
    from django.shortcuts import render


    def home(request):
        # Template -> fichero html para devolver
        template = 'core/home.html'
        # Context -> diccionario con variables para el html
        context = {mivariable: 'Hola home'}
        return render(request, template, context)
    ```

### Herencia

La gracia de las plantillas es poder reutilizar código html. Lo normal es definir una plantilla base, **base.html**, o varias, y reusarla en las demás.

Creo un fichero **base.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    <!-- Cabecera -->
    {% block header %}{% endblock %}
    <!-- Contenido -->
    {% block content %}{% endblock %}
    <!-- Pie de página -->
    {% block footer %}{% endblock %}
</body>
</html>
```

Las partes que van entre `{% block <bloque> %}{% endblock %}`, serán las partes que se harán en cada fichero a parte. Todo lo demás es común.

Ahora en el **home.html** haríamos lo siguiente

```html
{% extends 'core/base.html' %}

{% block title %}Home{% endblock %}

{% block header %}
<h1>HOME</h1>
{% endblock %}

{% block content %}
<h2>{{ mivariable }}</h2>
{% endblock %}

{% block footer %}
<p>Footer de la home</p>
{% endblock %}
```

1. Extendemos la plantilla base
2. Generamos el contenido de cada bloque
3. Si se pasa alguna variable en el context de la vista, podemos ponerla con `{{ <variable> }}`

### Enlaces relativos

Si queremos enlazar entre secciones de nuestra web, la manera de hacerlo es usando

```django
{% url <vista> %}
```

Por ejemplo `{% url 'home' %}`. El nombre de la vista, es decir, `<vista>` lo hemos definido en el `urls.py` anteriormente.

### Cargas ficheros estáticos (CSS, JS, img, media...)

Para poder cargar los estilos, imágenes, scripts JS, etc, primero hay que crear una carpeta donde los contenga. Esta carpeta va a seguir el mismo princpio que la carpeta **templates**, pero se va a llamar **static**. Es decir, que dentro de cada app que tenga ficheros estáticos tendremos:

* < proyecto-django >
    * < app >
        * static
            * < app >

Ya que luego Django recolectará todas las carpetas static en una **static** común. En nuestro ejemplo tendríamos **miproyecto/core/static/core/**.

Una vez hecho esto, lo siguiente será en el **base.html** y cada plantilla poner lo siguiente:

1. `{% load static %}`
    * Tanto en el `<head></head>` del `base.html`.
    * Como en cada plantilla, **solo se debe poner una vez**:
        * Puede ser al principio, despues del `{% entends '<app>/base.html' %}`.
        * Como dentro de un `{% block <bloque> %}{% endblock %}`.
2. Luego en cada enlace hacia el fichero estático, ponemos `"{% static '<app>/<path-al-estatico>' %}"`.

Un ejemplo podría ser

```html
<head>
  <!-- Estilos y fuentes -->
  {% load static %}
  <link href="{% static 'core/bootstrap/css/bootstrap.min.css' %}" rel="stylesheet">
</head>
<body>
    <script src="{% static 'core/jquery/jquery.min.js' %}"></script>
</body>
```

### Templates tags

Dentro de este sistema de plantillas lo que hemos estado usando se llaman Template Tags -> información oficial [aquí](https://docs.djangoproject.com/en/2.1/ref/templates/builtins/)

Existen muchos, como por ejemplo el `{% block <bloque> %}{% endblock %}`, o cuando queremos referirnos a una variable del contexto que usamos `{{ variable }}`.

Django permite muchos y muy diversos, como por ejemplo el típico `if`, `for`, y demás. También hay una variable de la propia web que es `request` y esta a su vez contiene más variables e información, como `request.path`, que indica en que path tenemos en la url.

Por ejemplo, supongamos que queremos ver un salto de línea en cierto sitio, si y solo si, si estoy en la home. La forma de hacerlo sería, en el `<body>` del `base.html`:

```html
{% if request.path != "/home/" %}<hr>{% endif %}
```

## Modelos

Django cuenta con su propio ORM para trabajar con las BBDD y trabaja siguiendo el paradigma MVT (Modelo Vista Template). Cada modelo es una clase heredará de una clase Modelo especifica.

Por ejemplo supongamos que queremos tener una sección que va a ser un proyecto, y cada proyecto contiene un título, una descripción y una imagen. Esto lo modelaríamos en bbdd de la siguiente manera

```python
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField()
    link = models.UrlField(null=True, blank=True)  # null para permitir nulo en bbdd, blank para permitir vacío en html
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

```

Se han añadido dos campos para poder tener un control de cuando se creó, `created`, y cuando se ha actualizado, `updated`.

Para aplicar estos cambios a la bbdd tenemos que hacer

```bash
python manage.py makemigrations [<app>]
```

Si queremos ponemos la app especifica, o sino no ponemos nada y hará todas las apps. Después de hacer las migraciones, tenemos que aplicarlas, para ello

```bash
python manage.py migrate [<app>]
```

## Django Admin

En el `urls.py` del proyecto tenemos una redirección a una cosa llamada admin

```python
path('admin/', admin.site.urls),
```

Si en el navegador lo abrimos, veremos que sale un login. Esto es una herramienta potentísima que tiene Django, el ***Panel de Administrador***.

### Crear superusuario

Para poder acceder a él necesitamos crear primero el superusuario del proyecto

```bash
python manage.py createsuperuser
```

Completamos el registro y volvemos a acceder al Django Admin con este usuario nuevo creado.

### Habilitar Modelo

Para poder trabajar con un modelo de una app debemos hacer lo siguiente en el fichero `admin.py` de la app correspondiente. Por ejemplo para el /miproyecto/core/admin.py tengo que poner

```python
from django.contrib import admin
from .models import Project

admin.site.register(Project)
```

Ahora podremos manipular el modelo desde el Admin.

### Tunear el Admin

#### Cambiar nombre de la app

En el fichero `apps.py` de la app, debemos de añadir el campo `verbose_name` con el nombre que queramos. Por ejemplo a la app core la voy a llamar principal, así que el /miproyecto/core/apps.py debe quedar así

```python
from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    vebose_name = 'Principal'

```

Recordemos que en el /miproyecto/miproyecto/settings.py en la parte de apps instaladas debe aparecer

```python
INSTALLED_APPS = [
    'core.apps.CoreConfig',
    ...
]
```

#### Cambiar nombre del modelo

Dentro de la clase del modelo, debemos crear una subclase llamada `Meta` (para metadata) y debe contener el atributo `verbose_name`.

Si queremos que luego cada objeto de ese modelo tenga un nombre más fácil de leer, debemos añadir el método `__str__` a la clase del modelo.

Por último, para que cada campo aparezca con el nombre que queramos, le añadimos el parámetro `verbose_name` a cada campo del modelo.

Siguiendo con el ejemplo, en /miproyecto/core/models.py pondremos al modelo `Project` el nombre `Proyecto`. Además le vamos a añadir el plural, y vamos a permitir que se ordene por fecha de creación más nueva a más vieja (con `-created`, si hubieramos puesto solo `created` sería de más antiguo al más nuevo). Para el nombre de cada proyecto le vamos a poner su título:

```python
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name='Titulo')
    description = models.TextField(verbose_name='Descripción')
    image = models.ImageField(verbose_name='Imagen')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Creado')
    updated = models.DateTimeField(auto_now=True, verbose_name='Actualizado')

    class Meta:
        verbose_name = 'proyecto'
        verbose_name_plural = 'proyectos'
        ordering = ['-created']

    def __str__(self):
        return self.title

```

Los campos `created` y `updated` Django los oculta por defecto, ya que son de solo lectura. Para hacer que aparecan debemos de

* Modificar el `admin.py` de la app
    * Creando un modelo extendido para el Admin
        * Pasándole una tupla con los campos de solo lectura.
    * Añadiendo el modelo extendido al admin.

/miproyecto/<app>/admin.py

```python
from django.contrib import admin
from .models import <Modelo>


class <Modelo>Admin(admin.ModelAdmin):
    readonly_fields = ('<campo1>', '<campo2>')


admin.site.register(<Modelo>, <Modelo>Admin)

```

Lo vemos más fácil con el ejemplo que estamos haciendo, el /miproyecto/core/admin.py tiene que quedar así

```python
from django.contrib import admin
from .models import Project


class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')


admin.site.register(Project, ProjectAdmin)

```

## Servir ficheros multimedia

Django por defecto no puede servir ficheros multimedia (imágenes, vídeos, etc). Los pasos para habilitarlos son

1. Crear una carpeta común llamada `media` por ejemplo, y estaría al mismo nivel que las apps, es decir <proyecto>/media.
2. En el `settings.py` (<proyecto>/<proyecto>/settings.py) del proyecto debemos de indicarle donde está la carpeta de estos archivos con

    ```python
    # Media files
    MEDIA_URL = '/media/'  # Ruta del navegador para encontrarlos
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # Ruta para encontrarlos dentro del Django
    ```

3. Si en el modelo tenemos algún formulario donde los usuarios pueden subir este tipo de ficheros, debemos añadirle el parámetro `upload_to` con el nombre del directorio que tendrá dentro de la carpeta `media`
   Por ejemplo en el /miproyecto/core/models.py hacemos que las imágenes de los proyectos las guarde en la carpeta /miproyecto/media/projects que Django generará automáticamente con

    ```python
    class Project(models.Model):
        ...
        image = models.ImageField(verbose_name='Imagen', upload_to='projects')
    ```

4. Ahora tenemos que habilitar una url para el directorio `media`, pero que solo sea accesible cuando estamos en modo `debug`.
    1. Modificar el `urls.py` del proyecto (<proyecto>/<proyecto>/urls.py) con

    ```python
    from django.conf import settings

    urlpatterns = [...]

    if settings.DEBUG:
        from django.conf.urls.static import static
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    ```

## MVT Modelo-Vista-Template

Django se basa en el paradigma MVT, que está basado en el MVC (Modelo-Vista-Controlador). Estos paradigmas indican básicamente como es el flujo de trabajo y a la vez permiten desacoplar las distintas partes del proyecto. Es un poco lioso al principio si vienes del MVC.

En el MVC tienes:

* Modelo -> Como está creada y almacenada la información (BBDD).
* Vista -> Es la parte encargada de la interfaz visual (Frontend).
* Controlador -> Como se manipula y trabaja con la información detrás de la interfaz (Backend).

En el MVT hay:

* Modelo -> Igual que el anterior (BBDD).
* Vista -> Equivale en realidad al Controlador (Backend).
    * Por eso decía que es lioso, porque al Controlador en Django se le llama Vista.
    * Y a la Vista se le llama Template.
* Template -> Equivale a la Vista (Frontend).

Hay que tener en cuenta que **MVT define el flujo de desarrollo**. En el MVT nosotros desarrollamos siguiendo estos pasos:

1. MODELO
    * `models.py` -> Creamos / modificamos el Modelo (BBDD).
    * `admin.py` -> Habilitamos las opciones que sean necesarias en el Admin.
2. VISTA
    * `views.py` -> Creamos / modificamos la Vista (Backend).
    * `urls.py` -> Habilitamos el acceso a través de la web a esa vista.
3. TEMPLATE
    * `templates/<app>/` -> Creamos / modificamos la Template (Frontend).
    * `static/<app>/` -> Creamos / modificamos los estáticos (CSS's, JS's).

**NOTA**: Un **mnemónico** para recordar esto es **MAVUTS** -> Models.py Admin.py Views.py Urls.py Templates Static.

Pero el flujo que sigue Django para servir una web en un enlace concreto es:

1. El navegador hace una petición a una url concreta.
2. Eso entra por el `urls.py` del proyecto y se redirecciona hasta llegar al `urls.py` de la app concreta.
3. De ahí se pasa a la vista, `views.py`.
4. El `views.py` interactua con la bbdd gracias al `models.py`.
5. Después computar toda la info, devuelve la template específica, `<app>/templates/<app>/<vista>.html`, ya formateada (con los tags sustituidos por su valor final).
6. El navegador renderiza el fichero y sirve la web.

### Ejemplo práctico

Para que tu editor no te de problemas, se recomienda instalar el linter `pylint-django`. Para activarlo hay que hacer:

* Editar los `pylintArgs` con
    * `--errors-only`
    * `--load-plugins`
    * `pytlint_django`

Supongamos que vamos a querer tener una sección portfolio en esta web, llena de los proyectos. Lo primero será crear la app portfolio

```bash
python manage.py startapp portfolio
```

1. Tendremos nuestra nueva app portfolio junto con `core` y `miproyecto`. Una vez creada, damos de alta la app en el `settings.py` del proyecto

    ```python
    INSTALLED_APPS = [
        'portfolio.apps.PortfolioConfig',
    ]
    ```

2. Modelo -> `models.py`:
    * Quitamos `Projects` del modelo de `core` (en su `models.py`) y nos lo llevamos al `models.py` de `portfolio`.
    * Hacemos las migraciones en la base de datos con

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

3. Admin -> `admin.py`:
    * Quitamos el `Projects` de `core` del Admin en su `admin.py`.
    * Damos de alta `Projects` de `portfolio` en el Admin con su `admin.py`.
4. Vista -> `views.py`:
    * Creamos la vista `portfolio` en el `views.py`.
    * Podemmos usar el modelo en la vista de la siguiente manera

    ```python
    from django.shortcuts import render
    from .models import Project


    def portfolio(request):
        template = 'portfolio/portfolio.html'
        projects = Project.objects.all()
        context = {'projects': projects}
        return render(request, template, context)

    ```

5. Urls -> `urls.py`:
    * En el `urls.py` del proyecto redireccionamos al `urls.py` de `portfolio`

    ```python
    from django.urls import path, include

    urlpatterns = [
        path('portfolio/', include('portfolio.urls')),
    ]
    ```

    * En el `urls.py` de `portfolio` enlazamos la vista creada.

    ```python
    from django.urls import path
    from . import views

    urlpatterns = [
        path('', views.portfolio, name='portfolio'),
    ]
    ```

6. Template -> `miproyecto/portfolio/templates/portfolio/<plantilla>.html`
    * Creamos el template `miproyecto/portfolio/templates/portfolio/portfolio.html`.
    * Dentro de esta template, heredamos del `base.html` del `templates` de `core`.
    * Un ejemplo de como podríamos usar el modelo dentro de la plantilla podria ser un template-tag `{% for %}`, ya que le hemos pasado todos los proyectos.

    ```html
    {% extends 'core/base.html' %}
    {% load static %}
    {% block title%}Portfolio{% endblock%}
    ...
    {% block content%}
    <ul>
        {% for project in projects %}
        <li>
            Título: {{project.title}}
            Descripción: {{project.description}}
            Imagen: {{project.image.url}}
        </li>
        {% endfor %}
    </ul>
    {% endblock }
    ```

7. Static -> `miproyecto/portfolio/static/portfolio/<archivos>`
    * si necesito cualquier estático lo uso en `portfolio.html` con

    ```html
    {% static 'portfolio/<fichero-estatico>' %}
    ```
