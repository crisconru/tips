# Comandos para trabajar con Docker

## docker search - Buscar imágenes

Una vez hecha la cuenta, podemos buscar imágenes tanto desde la web, como desde la terminal con el comando `docker search`. Por ejemplo si quiero buscar una imagen de Ubuntu por ejemplo haría  

```bash
docker search ubuntu
```

Y veremos la cantidad de imágenes disponibles de ubuntu que se han creado, oficiales o no, y cuantas estrellas / likes tienen. Si solo quisieramos ver por ejemplo las imagenes de ubuntu que sean de 14.04, haríamos

```bash
docker search ubuntu:14.04
```

## docker pull - Descargar imágenes

Para poder descargar una imagen basta con poner `docker pull <nombre-de-la-imagen>`. Por ejemplo si queremos descargar la ubuntu oficial haríamos

```bash
docker pull ubuntu
```

Pero si por ejemplo nos interesa más la ubuntu de pivotaldata, es tan sencillo como

```bash
docker pull pivotaldata/ubuntu
```

## docker images - Ver imágenes descargadas en el sistema

Con este comando podemos ver todas las imagenes que se han descargado en el sistema. **OJO**, imagén es distinto de contenedor, podemos tener varios contenedores de la misma imagen.

```bash
docker images
```

Veremos como después de descargar la imagen, la ejecuta y obtenemos un mensaje por pantalla generado por el contenedor.

## docker ps - Ver los contenedores ejecutándose / ejecutados

Para poder ver los contenedores ejecutándose hacemos

```bash
docker ps
```

Si en cambio queremos ver los que se han ejecutado

```bash
docker ps -a
```

Más info con el comando `docker ps --help`

## docker run - Lanzar contenedores

Para lanzar un contenedor basta con usar (tanto las opciones como los comandos son opcionales)

```bash
docker run [<opciones>] <contenedor> [<comandos>]
```

Más info -> `docker run --help`.

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

Ejemplo, limitar memoria a 500MB y solo usar hasta 2 cores

```bash
docker run -m "500mb" --cpu-set-cpus 0-1 <imagen>
```

## docker start / restart - Arrancar un contenedor parado

Con `docker ps -a` podemos ver los contenedores que ya no están activos (`STATUS = Exited`). Si queremos volver a la lanzar uno, debemos de copiar su id (podemos usar el **name** del contenedor en lugar de su id) y ejecutar

```bash
docker start <id-contenedor>
```

También existe el comando `docker restart`

## docker attach - Entrar en un contenedor activo

Para poder entrar dentro de un contenedor que se está ejecutando debemos de tener su id y ejecutar

```bash
docker attach <id-contenedor>
```

También podemos usar el **name** del contenedor en lugar de su id.

## docker exec - Ejecutar comandos en un contenedor activo

Si queremos que dentro de un contenedor que ya se encuentra activo se ejecute algún comando se usa

```bash
docker exec [<opciones>] <id-o-name-contenedor> <comando> [<argumentos>]
```

## docker stop - Parar un contenedor

Para acabar con la ejecución de un contenedor usamos el comando

```bash
docker stop <id-o-nombre-del-contenedor>
```

## docker rm / rmi - Borrar contenedor / imagen

Para borrar imagen

```bash
docker rmi <imagen>
```

Para borrar contenedor hacemos

```bash
docker rm <id-o-name-del-contenedor>
```

Si quisieramos que un contenedor se borrase una vez se dejara de ejecutar

```bash
docker run --rm <imagen>
```

Más info -> `docker rm --help` | `docker rmi --help`

## docker history - Ver el historial de una imagen

Para poder ver todos los pasos que ha llevado a cabo hacer una imagen se usa

```bash
docker history <id-o-name-de-la-imagen>
```

Se recomienda usar la opción `-H` para poder leerlo mejor

```bash
docker history -H <imagen>
```

Más info -> `docker history --help`

## docker logs - Ver los logs (salidas) de un contenedor

```bash
docker logs [<opciones>] <contenedor>
```

## docker stats - Ver consumo de recursos de un contenedor

```bash
docker stats [<opciones>] <contenedor1> <contenedor2> ...
```

## docker cp - Copiar ficheros a / desde un contenedor activo

```bash
docker cp [<options>] <src-path> <contenedor>:<dest-path>
docker cp [<options>] <contenedor>:<src-path> <dest-path>
```

## docker inspect - Obtener información de bajo nivel de un contenedor

```bash
docker inspect [<opciones>] <contenedor> [<contenedor2> <contenedor3> ...]
```

## docker commit - Crear una imagen a partir de un contenedor (modificado)

Supongamos que hemos abierto un contenedor, hemos modificado cosas y lo tenemos listo para trabajar. Si queremos crear una imagen así para poder usarla, lo que haríamos sería

```bash
docker commit <contenedor-modificado> <nombre-imagen-nueva>
```

Podemos además ejecutar comandos previos al commit para crear la nueva imagen. Por ejemplo, supongamos una imagen de ubuntu que le hemos instalado el servidor Apache2 y hemos lanzado el servicio. Con

```bash
docker commit --change='CMD ["apache2ctl", "-D FOREGROUND"]' -c "EXPOSE 85" <contenedor> <nombre-de-la-nueva-imagen>
```

exponemos el puerto 85 del contenedor y tenemos el apache2 en primer plano.

Más info -> `docker commit --help`
