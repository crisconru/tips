# Arrancar contenedores

TODO

Ejemplo, limitar memoria a 500MB y solo usar hasta 2 cores

```bash
docker run -m "500mb" --cpu-set-cpus 0-1 <imagen>
```

### Hello World

Para hacer un ***Hola mundo*** en Docker, lo que se hace es ejecutar un contenedor de la imagen **hello-world**. Para ello podemos bajar la imagen con `docker pull hello-world` y luego ejecutarlo. O bien ejecutarlo directamente y ya docker se encarga de bajar la imagen si n está y ejecutarla. Para ello hacemos

```bash
docker run hello-world
```

### Puertos

Por defecto todos los contenedores tienen todos los puertos cerrados. En muchos casos tienen ciertos puertos para poder consumir un servicio y el propio contenedor te dice que puertos y que tráfico soportan. La gracia aquí está en que nosotros podemos asignarle cualquier puerto del Host a ese puerto del contenedor con la opción `-p <puerto-host>:<puerto-contenedor>`. En el ejemplo ejecuto un docker con un jenkins, y le asígno el puerto 80 de mi máquina (que es el que usan los navegadores) al puerto 8080 del contenedor (que es por donde se despacha el jenkins).

```bash
docker run -p 80:8080 jenkins
```

Esto es un buena solución en cuestiones de seguridad y de escalabilidad, ya que el contenedor tiene los puertos por defecto pero el host no.

### Lanzar contenedor con comando

Para ver por ejemplo el filesystem del contenedor ubuntu hacemos `docker run ubuntu ls`.  

### Contenedores interactivos

Para que el contenedor ubuntu no se pare por ejemplo, podemos acceder con la opción **interactive** y con **tty**

```bash
docker run -i -t ubuntu bash
```

Ahora estamos dentro del container y podemos ejecutar comandos o lo que queramos.

### Asignarle un nombre al contenedor

Para asignarle un nombre al contenedor para ser usado de manera más cómoda, hay que usar la opción `--name`. Este nombre se podrá usar en sustitución del **id** del contenedor en muchos comandos, haciendo así más fácil su uso.

```bash
docker run --name perico -it ubuntu
```

Si queremos renombrar un contenedor debemos usar el comando `docker rename`.

```bash
docker rename <nombre-actual-del-contenedor> <nuevo-nombre-del-contenedor>
```

### Salir del contenedor

* Salir del contenedor y apagarlo / matarlo:
  * Para salir del contenedor podemos ejecutar el comando `exit`
  * Usar la combinación ***Ctrl+D***.
* Salir del contenedor pero mantenerlo activo:
  * Mantener todo el rato la tecla ***Ctrl***
  * Luego pulsar ***P***
  * Después ***Q***
  * Es decir -> ***Ctrl+P***, ***D***

### Limitar recursos