# Entornos Virtuales

Si estas en la carpeta `/home/manuel/Code` y tienes un fichero Python llamado `hola.py`, para ejecutarlo desde la consola pones `python3 hola.py`. Esta instrucción lo que hace es buscar el programa Python 3 que hay en tu sistema operativo, posiblemente esté en `/usr/bin/python3`, siendo `python3` un enlace a una versión de Python 3 de tu sistema operativo (`python3.4`, `python3.5`, `python3.6`...). Si por ejemplo la versión de Python 3 enlazada es la 3.5, hacer `python3 hola.py` equivale a `/usr/bin/python3.5 /home/manuel/hola.py`. Además, por cada versión de Python instalada en tu sistema operativo, puedes contar con su gestor de paquetes [PIP](https://pip.pypa.io/en/stable/installing/).

>¿Que ocurre si quiero probar cosas muy distintas con Python (por ejemplo desarrollo web, matemáticas, etc)?

Que al final tengo instalado desde pip una cantidad de paquetes "basura", que no voy a usar ¿Y si quiero usar una versión de una librería para un proyecto y otra versión para otro? Pues que tendría que estar instalando/desinstalando cada vez que tenga que ponerme con un proyecto u otro. Ya se empieza a ver que esto es un engorro, ¿verdad?

## VENV / Virtualenv

Para solucionar todo esto se creó un concepto llamado **"Entorno virtual"** o **Virtualenv**. Consiste en decir

>"venga quiero tener una versión (aislada del sistema operativo) de Python con su pip para poder cacharrear/trabajar, y cuando me harte la borro y listo"

¿Por qué aislada? Porque el sistema operativo usa Python para sus cosas también, así que es recomendable siempre, en la medida de lo posible, no tocar nunca el Python del sistema.

> NOTA: En vez de usar `virtualenv`, usa `venv` que ya viene instalado en el propio Python

### Instalar venv

`venv` ya viene instalado con Python. Si no viniese, instalalo con

```bash
sudo apt install python3-venv
```

### Usar entornos virtuales

Una vez instalado, generas un virtualenv nuevo con la instrucción `python3 -m venv <nombre-del-virtualenv>`.

Supon que quieres hacer un virtualenv para probar desarrollo web con Python. Pues haces `python3 -m venv env`. Esto creará una carpeta en el directorio donde estés que se llamará `env`. Dentro de esta carpeta tendrás un montón de carpetas con un python listo para usarlo.

Para activar el virtualenv tienes que ejecutar un script que se llama `activate` dentro del virtualenv. Imagina que el virtualenv `env` esta en el directorio `/home/manuel/web`, pues para activarlo desde la terminal ejecuta `source /home/manuel/web/env/bin/activate`. Ahora veras como en el `prompt`de la consola (la linea donde pones los comandos) delante de todo pone `(env)`. Eso quiere decir que tienes el virtualenv activado. si ahora ejecutas `python --version` y `pip --version` veras que está usando el python y el pip del virtualenv.  

Para poder salir del virtualenv solo tienes que ejecutar `deactivate` y veras como el `(env)` desaparece del prompt.

Si quieres borrar el virtualenv, tienes que borrar toda la carpeta `env`.  

El problema de esto, es que es un poco engorroso tener que estar poniendo la ruta del `activate` cada vez que quieras acceder al virtualenv.

## Virtualenvwrapper

[Virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) es una utilidad montada sobre virtualenv que permite trabajar con entornos virtuales de manera mucho más cómoda.

### Instalar virtualenvwrapper

Para que funcione tienes que hacer:

1. Instalarlo con el pip del sistema `pip install virtualenvwrapper`o `pip3 install virtualenvwrapper`.
2. Dentro del fichero de configuración que usa tu terminal `.bashrc`o `.zshrc` (está en el directorio home), tienes que añadir decirle:
    1. Que Python es el que va a usar virtualenvwrapper. Es decir, el Python con el que lo has instalado. Si es el del sistema operativo entonces es `/usr/bin/python3`.
    2. En que directorio se van a guardar todos los virtualenvs. Por lo general se suele poner la carpeta `.virtualenvs`en el home.
    3. Opcionalmente se le puede indicar en que carpeta vas a tener los programas/códigos/proyectos. Así cuando actives un virtualenv, directamente te va a abrir esa carpeta (lo cual es mucho más cómodo). En este ejemplo se a usa la carpeta `Coding`.
    4. Hay que indicarle que cargue el script de virtualenvwrapper que se llama `virtualenvwrapper.sh`. Para encontrarlo (normalmente lo deja en `$HOME/.local/bin/virtualenvwrapper.sh`) hay que usar el comando `sudo find / -name virtualenvwrapper.sh`

Así que al final tu fichero `/home/manuel/.bashrc` o `/home/manuel/.zshrc` tiene que tener algo así:

```bash
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Coding
source $HOME/.local/bin/virtualenvwrapper.sh
```

Ahora tienes que cargar de nuevo tu terminal. Simplemente cierrala y vuelve a abrirla o hazlo manualmente ejecutando `source ~/.bashrc` (si usas BASH) o `source ~/.zshrc` (si usas ZSH).

### Como usar virtualenvwrapper

Ejecuta `workon` y te listará todos los entornos virtuales que tengas creados en tu `$WORKON_HOME`.

Con el comando `mkvirtualenv` puedes crear un entorno virtualenv de manera más cómoda. Si quisiera crear el entorno virtual de antes, ejecuta `mkvirtualenv web` (`mkvirtualenv -p python3.6 web`). Esto no solo no crea el virtualenv `web`, sino que además lo abre / activa.  

Si quieres cerrar / desactivar el virtualenv usa `deactivate`. Para poder activarlo de nuevo ejecuta `workon web`.

Para borrar un virtualenv usa el comando `rmvirtualenv`. Así para borrar el virtualenv `web` haces `rmvirtualenv web`y listo.

El único problema que tienes ahora es que esto solo tira con un Python que sea de la misma versión que la de tu sistema operativo ¿Y si quieres un Python anterior o uno más moderno?

### Añadir PYTHONPATH

> La solución ha sido obtenida de [aquí](https://stackoverflow.com/a/17963979/3616381).  

Supon que tienes un proyecto python con la siguiente estructura:  

```bash
proj
|-src
  |-foo.py
|-examples
  |-examplebar
    |- bar.py
```

Y que el fichero `bar.py` contiene la siguiente línea

```python
from src import foo
```

Si desde `proj` ejecutas  

```python
python examples/examplebar/bar.py
```

Lo más probable es que la consola te dé un error como  
`ModuleNotFoundError: No module named 'src'`.

Esto es porque `proj` no está añadido a la variable de entorno `$PYTHONPATH`. Para ver que contiene esta variable puedes abrir la consola de python y ejectuar

```python
import sys
sys.path
```

Podras comprobar como tu directorio no está. Para añadir el directorio a la variable hay muchas maneras, pero ya usas virtualenvwrapper (entre otras cosas), solución es bien sencilla:

1. Desde la terminal nos vas al directorio `proj`.
2. Activas el virtualenv correspondiente `workon ...`.
3. Escribe en la terminal `add2virtualenv .`. Esto añadirá el actual directorio a la variable $PYTHONPATH.

Y ya está, ya podras ejecutar sin problemas tu proyecto.  

Si quisieras deshacer lo que has hecho, simplemente en el paso 3. de antes ejecuta `add2virtualenv -d .`, y con eso sería suficiente.

## Pyenv

[Pyenv](https://github.com/pyenv/pyenv) es una herramienta, copiada de otra del lenguage Ruby, para poder tener distintas versiones de Python instaladas en el equipo sin comprometer la integrigad del sistema operativo. Básicamente pyenv lo que hace es poner en la variable del sistema `$PATH` los binarios de las versiones de Python que instala.

> Este link está chachi -> [artículo de David Naranjo](https://ubunlog.com/pyenv-instala-multiples-versiones-de-python-en-tu-sistema/)

### Instalar pyenv

Hay un instalador automático:

1. Descarga el instalador de pyenv y este instalará todo normalmente `$HOME/.pyenv`

    ```bash
    # Para BASH
    curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
    # Para ZSH
    curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | zsh
    ```

2. Enlazar los binarios en la variable del sistema `$PATH`. Pon esto en tu fichero `$HOME/.bashrc` si usas BASH o `$HOME/.zshrc` si usas ZSH.

    ```bash
    export PYENV_ROOT="$HOME/.pyenv"
    command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
    eval "$(pyenv init -)"
    ```

3. Recarga la terminal cerrándola + volviéndola a abrir o con `source $HOME/.bashrc` para BASH o `source $HOME/.zshrc` para ZSH.

Si te da problemas de deps, pues ve instalándolas conforme las pida. Antes las deps que necesitaba eran estas:

```bash
sudo apt install -y make build-essential git libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev
```

Para más problemas [mira en esta página](https://github.com/pyenv/pyenv/wiki/Common-build-problems).

Para desintalar todo es tan sencillo como borrar la carpeta `$HOME/.pyenv` -> `sudo rm -rf $HOME/.pyenv`.

### Como usar pyenv

Actualiza primero pyenv con

```bash
pyenv update
```

Ahora puedes listar todas las versiones de Python para instalar en tu equipo con

```bash
pyenv install -l
```

Imagina que quieres instalar la versión `3.11.1` pues entonces haces

```bash
pyenv install 3.11.1
```

Esto instalará un interprete de Python 3.11.1 en la carpeta `~/.pyenv/versions/`. Para que puedas ver que versiones de Python tienes instaladas ejecuta

```bash
pyenv versions
```

Y tendrás listadas tanto la versión del sistema, como las que hayas instalado con pyenv.

Cuando quieras usar una versión de Python concreta, por ejemplo la 3.11.1 que acabas de instalar, ejecuta

```bash
pyenv local 3.11.1
```

En esa carpeta donde estás se te creará un fichero `.python-version` que contiene `3.11.1` como contenido. Si ahora ejecutas `python --version` desde la terminal, verás que usa el Python 3.11.1 de pyenv.

Para deshacer esto y que vuelva a tener la versión de Python del sistema operativo, borra ese fichero `.python-version` o ejecuta

```bash
pyenv local system
```

También puedes modificar el Python global que puedes usar, pero no te lo recomiendo.

```bash
# Con esto modificas el Python global para que tira del 3.11.1 que has instalado
pyenv global 3.11.1
# Con esto dejas todo como estaba
pyenv global system 
```

Así que lo único que tienes que hacer a partir de ahora es:

1. Con pyenv elije que Python vas a usar en esa carpeta.
2. Genera tus entornos virtuales nuevos.

Virtualenvwrapper + Pyenv ya te sirve para tener todo chachi para trabajar, pero te recomiendo que uses *Poetry* en lugar de Virtualenvwrapper. Antes había otra herramienta, Pipenv, pero no te la recomiendo a día de hoy.

## Poetry

[Poetry](https://python-poetry.org/) es una herramienta para poder gestionar mejor los proyectos Python con entornos virtuales y hacer empaquetado. En parte sería un equivalente a [NPM](https://docs.npmjs.com/about-npm) en el ecosistema NodeJS.

### Instalar Poetry

Hay que ejecutar

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Básicamente el comando lo que ha hecho es:

1. Instalar Poetry, normalmente en `$HOME/.local/share/pypoetry/venv/bin/poetry`.
2. Crear un enlace simbólico en `$HOME/.local/bin/poetry` que apunta a la instalación anterior.

Para comprobar que se ha instalado bien ejecuta

```bash
poetry --version
```

Si no te va, es porque no tienes `$HOME/.local/bin` añadido a tu `$PATH`. Te recomiendo que añadas entonces solo esto a tu `$HOME/.bashrc` o  `$HOME/.zshrc`.

```bash
export POETRY_HOME="$HOME/.local/share/pypoetry/venv/"
command -v poetry >/dev/null || export PATH="$POETRY_HOME/bin:$PATH"
```

Recarga la terminal con `source $HOME/.bashrc` o `$HOME/.zshrc` y prueba de nuevo con `poetry --version`.

Si tuvieras que desinstalar poetry usa

```bash
curl -sSL https://install.python-poetry.org | python3 - --uninstall
```

### Configurar poetry

Antes de usarlo, te recomiendo que hagas unos pequeños ajustes. Para poder ver la configuración de poetry ejecuta

```bash
poetry config --list
```

La parte que debes de cambiar es `virtualenvs.path` para que use la que configuraste con Virtualenvwrapper.

```bash
poetry config virtualenvs.path $HOME/.virtualenvs
```

También puedes hacerlo añadiendo al fichero `$HOME/.bashrc` o `$HOME/.zshrc`

```bash
export POETRY_VIRTUALENVS_PATH=$HOME/.virtualenvs
```

### Como usar poetry

Lo primero, actualiza poetry con

```bash
poetry self update
```

Poetry funciona en tus proyectos usando un fichero `pyproject.toml`. Abrelo y te vas familiarizando con él.

Si tienes un proyecto ya hecho y quieres *"poetryzarlo"* ejecuta

```bash
poetry init
```

Si vas a empezar un proyecto desde cero con poetry, él puede crearte todo el scafolding (toda la estructura de carpetas) con

```bash
poetry new mi_proyecto
```

Y si te acabas de descargar un proyecto que usa poetry, solo tienes que seguir leyendo.

Sea como sea, una vez tengas un proyecto ya con tu ficherico `pyproject.toml` te recomiendo que hagas esto para poder tener tu virtualenv:

1. Elige la versión de Python para ese proyecto con pyenv (por ejemplo 3.11.1)

    ```bash
    pyenv local 3.11.1
    ```

2. Crea el entorno virtual con poetry usando esa versión de Python

    ```bash
    poetry env use 3.11
    ```

Ahora ya tienes una el entorno virtual listo.

Para añadir dependencias a tu proyecto

```bash
poetry add <dependencia>
```

Si la dependencia es solo de desarrollo, es decir que no la usa el proyecto en producción pero tu si para desarrollar (como un linter o tests)

```bash
poetry add -D <dependencia>
```

Si lo que quieres es instalar todas las deps que tenía definido el proyecto

```bash
poetry install
```

Si quieres activar el entorno virtual

```bash
poetry shell
```

Para desactivarlo pues con

```bash
deactivate
```
