# Anotaciones Django

## Agregar una nueva app

### 1. Crear la app

```python
python manage.py startapp nuevapp
```

### 2. Habilitarla en el settings.py del proyecto

Para ello en `INSTALED_APPS` añadir `nuevapp.apps.NuevappConfig`

### 3. Indicarle donde van los medias si está en DEBUG

En el `setting.py` del proyecto definir en que url van los archivos media con `MEDIA_URL`, y luego indicarle en que directorio van a estar con `MEDIA_ROOT = os.path.join(BASE_DIR, <directorio de los media>)`

En el `urls.py` de la aplicación `nuevapp` importar las settings

```python
from django.conf import settings
```

y debajo del urlspatterns poner

```python
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
```

### 4. Crear el modelo

En el `models.py` de la `nuevapp`

### 5. Habilitarlo en el admin

En el `admin.py` de `nuevapp` hay que primero importar el modelo

```python
from .models import MiModelo
```

Luego agregarlo con `register()`

```python
admin.site.register(MiModelo)
```

Si quisieramos tener campos de solo lectura, en lugar de agregar el modelo con `register()` debemos antes de crear una clase `MiModeloAdmin` que here de `admin.ModelAdmin`, indicarle los campos de solo lectura con una tupla en el atributo `readonly_fields` y por último agregar al modelo tanto el modelo como la nueva clase

```python
class MiModeloAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')


admin.site.register(MiModelo, MiModeloAdmin)
```

### 6. Crear las vistas

En el `views.py` de `nuevaapp`

### 7. Asignarle un endpoint / url a cada vista

En el `urls.py` de `nuevapp`

### 8. Crear su plantilla / template (HTML, CSS, JS, ...)

1. HTMLs -> Crear una carpeta `templates` en `nuevaapp` y dentro de esta, otra llamada `nuevapp`. Dentro de esta carpeta irán todos los html.
2. CSSs, JSs, ... -> Crear una carpeta `static` en `nuevapp` y dentro de esta, otra llamada `nuevapp`. Dentro de esta irán todos los css, js, imagenes, y demás ficheros necesarios para los html.
