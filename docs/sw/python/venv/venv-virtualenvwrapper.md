# Virtualenvwrapper

Es una utilidad montada sobre virtualenv que permite trabajar con entornos virtuales de manera mucho más cómoda.  

Para instalarlo solo tenemos que hacer `pip install virtualenvwrapper`o `pip3 install virtualenvwrapper` con el pip del sistema. Una vez instalado, tenemos que configurarle un par de cosillas más. Dentro del script que usa nuestra terminal `.bashrc`o `.zshrc` (está en el directorio home), hay que añadir al menos 3 líneas:

1. Hay que indicarle en que directorio se van a guardar todos los virtualenvs. Por lo general se suele poner la carpeta `.virtualenvs`en el home.
2. Opcionalmente se le puede indicar en que carpeta vas a tener los programas/códigos/proyectos. Así cuando actives un virtualenv, directamente te va a abrir esa carpeta (lo cual es mucho más cómodo). Yo por ejemplo voy a usar la carpeta `Code`.
3. Hay que indicarle donde se encuentra el script de virtualenvwrapper, que se llama `virtualenvwrapper.sh`. Una manera de saber donde se encuentra en nuestro sistema es ejecutar. Supongamos que lo ha encontrado en la carpeta `/usr/local/bin/`.

Así que al final de nuestro fichero `/home/manuel/.bashrc` o `/home/manuel/.zshrc` añadimos 

```bash
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Code
source /usr/local/bin/virtualenvwrapper.sh
```

Y lo cargamos con `source ~/.bashrc`o `source ~/.zshrc`. Una vez lo tengamos cargado, ya podemos trabajar con virtualenvwrapper.  

Con el comando `mkvirtualenv` podemos crear un entorno virtualenv de manera más cómoda. Si quisiera crear el entorno virtual de antes ejecutaríamos `mkvirtualenv -p python3.6 web`. Esto no solo nos crea el virtualenv `web` con Python 3.6 sino que además nos lo abre.  

Si queremos cerrar el virtualenv usamos `deactivate`.  

Para poder ver que entornos virtuales tenemos en el sistema ejecutamos `workon`. Y si queremos abrir uno en concreto, por ejemplo `web`, ejecutamos `workon web`. Si tenemos otro virtualenv que se llame `kivy` por ejemplo, podemos abrirlo desde el virtualenv `web` sin problemas. Al hacer `workon kivy` desde `web`, esto cerrará el virtualenv `web` y abrirá el de `kivy`.  

Cuando queramos borrar un virtualenv usaremos el comando `rmvirtualenv`. Así para borrar el virtualenv `web` hacemos `rmvirtualenv web`.
