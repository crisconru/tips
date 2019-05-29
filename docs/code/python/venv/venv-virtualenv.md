# Virtualenv

Para solucionar todo esto se creó un concepto llamado **"Entorno virtual"** o **Virtualenv**. Consiste en decir "venga quiero tener una versión (aislada del sistema operativo) de Python con su pip para poder cacharrear/trabajar, y cuando me harte la borro y listo" ¿Por qué aislada? Porque el sistema operativo usa Python para sus cosas también, así que es recomendable siempre, en la medida de lo posible, no tocar nunca el Python del sistema.  

Toda la información está en su web -> [Virtualenv](https://virtualenv.pypa.io/en/stable/), y para instalarlo es tan sencillo como ejecutar `pip install virtualenv` o `pip3 install virtualenv`.  

Una vez instalado, generamos un virtualenv nuevo con la instrucción `virtualenv <nombre-del-virtualenv>`. Supongamos que quiero hacer un virtualenv para probar desarrollo web con Python 3.6 (siempre que tenga Python 3.6 instalado en el sistema). Pues hago `virtualenv web --python=python3.6`, esto me creará una carpeta en el directorio donde esté que se llamará `web`. Dentro de esta carpeta tendré un montón de carpetas y con un python3.6 listo para usarse.  
Para activar el virtualenv tendremos que ejecutar que se llama `activate` dentro del virtualenv. Imaginemos que el virtualenv `web`esta en el directorio `/home/manuel/`, pues para activarlo desde la terminal ejecuto `source /home/manuel/web/bin/activate`. Ahora veremos como en el `prompt`de la consola (la linea donde ponemos los comandos) delante de todo pone `(web)`. Eso quiere decir que tenemos el virtualenv activado. si ahora ejecutamos `python --version` y `pip --version` veremos que está usando el python y el pip del virtualenv.  

Para poder salir del virtualenv solo tenemos que ejecutar `deactivate`y veremos como el `(web)` desaparece del prompt.  

Si queremos borrar el virtualenv, tenemos que borrar toda la carpeta `web`.  

El problema de esto, es que es un poco engorroso tener que estar poniendo la ruta del `activate` cada vez que quieras acceder al virtualenv. Para hacerlo un poco-bastante más cómodo, se creó [Virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/).
