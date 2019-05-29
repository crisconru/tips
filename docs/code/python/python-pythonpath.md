# Editar $PYTHONPATH

La solución ha sido obtenida de [aquí](https://stackoverflow.com/a/17963979/3616381).  
Supongamos que estuvieramos creando un proyecto python con la siguiente estructura:  

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

Si desde `proj` ejecutamos  

```python
python examples/examplebar/bar.py
```

Lo más probable es que la consola nos dé un error como  
`ModuleNotFoundError: No module named 'src'`  
Esto es porque `proj` no está añadido a la variable de entorno `$PYTHONPATH`. Para ver que contiene podemos abrir la consola de python y ejectuar

```python
import sys
sys.path
```

Podremos comprobar como nuestro directorio no está. Para añadir el directorio a la variable hay muchas maneras, pero como yo uso virtualenv con virtualenvwrapper (entre otras cosas), solución es bien sencilla:

1. Desde la terminal nos vamos al directorio `proj`.
2. Activamos el virtualenv correspondiente `workon ...`.
3. Escribimos en la terminal `add2virtualenv .`. Esto añadirá el actual directorio a la variable $PYTHONPATH.

Y ya está, ya podremos ejecutar sin problemas nuestros ejemplos.  

Si quisieramos deshacer lo que hemos hecho, simplemente en el paso 3. de antes ejecutamos `add2virtualenv -d .`, y con eso sería suficiente.