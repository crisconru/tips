# Encontrar un fichero

Supongamos que quiero encontrar el fichero **config.ini** y por ejemplo queremos buscarlo en el directorio **home** (~/). Desde la terminal pondría  

``` bash
find ~/ -type f -name "config.ini"
```

La versión Python de esto se explica aquí -> [Python version](https://stackoverflow.com/questions/1724693/find-a-file-in-python)  
Aquí por ejemplo buscamos todos los ficheros **.txt** en el directorio **home**

``` python
import os, fnmatch

def find(pattern, path):
    result = []
    for root, dirs, files in os.walk(path):
        for name in files:
            if fnmatch.fnmatch(name, pattern):
                result.append(os.path.join(root, name))
    return result

find('*.txt', '/home')
```

## Referencias

* [Link de ayuda](https://askubuntu.com/questions/144698/find-a-file-by-name-using-command-line) 