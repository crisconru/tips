# Docker

Importante aclarar:

* Docker Host o solo Host -> Es la máquina donde se van a ejecutar los contenedores.
* Docker Container o solo Contenedor -> Lo que entendemos por contenedor.
* Docker Image o solo Imagen -> Es el modelo sobre el que se basa el contenedor.
  * Si un contenedor equivale a una VM (máquina virtual).
  * Entonces una imagen equivale a la iso del SO que usamos para crear la VM.

## Instalación

En este [enlace](https://get.docker.com/) está el script para instalar docker. En consola haríamos  

```bash
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh -y
```

Después de instalarlo deberemos darle los permisos al usuario docker para no tener que usarlo como root

```bash
sudo usermod -aG docker $USER
```

Ahora hay que cerrar sesión / logout / reiniciar, y volver a entrar para que los cambios surtan efecto. Una vez hecho esto podemos comprobar que todo funciona correctamente con los siguientes comandos (probarlos todos):

* `docker -v` -> Versión instalada en formato corto.
* `docker version` -> Versión instalada en formato extendido.
* `docker info` -> Información detallada del sistema.
* `docker` -> Lista todos los comandos de docker.

## Docker Hub

Lo primero que se recomienda es hacerse una cuenta en [Docker Hub](https://hub.docker.com/). Esta es una plataforma donde se suben y donde poder ir subiendo, imágenes docker.

## Comandos para trabajar con Docker

### docker search -> Buscar imágenes

Una vez hecha la cuenta, podemos buscar imágenes tanto desde la web, como desde la terminal con el comando `docker search`. Por ejemplo si quiero buscar una imagen de Ubuntu por ejemplo haría  

```bash
docker search ubuntu
```

Y veremos la cantidad de imágenes disponibles de ubuntu que se han creado, oficiales o no, y cuantas estrellas / likes tienen. Si solo quisieramos ver por ejemplo las imagenes de ubuntu que sean de 14.04, haríamos

```bash
docker search ubuntu:14.04
```

### docker pull -> Descargar imágenes

Para poder descargar una imagen basta con poner `docker pull <nombre-de-la-imagen>`. Por ejemplo si queremos descargar la ubuntu oficial haríamos

```bash
docker pull ubuntu
```

Pero si por ejemplo nos interesa más la ubuntu de pivotaldata, es tan sencillo como

```bash
docker pull pivotaldata/ubuntu
```

### docker images -> Ver imágenes descargadas en el sistema

Con este comando podemos ver todas las imagenes que se han descargado en el sistema. **OJO**, imagén es distinto de contenedor, podemos tener varios contenedores de la misma imagen.

```bash
docker images
```

Veremos como después de descargar la imagen, la ejecuta y obtenemos un mensaje por pantalla generado por el contenedor.

### docker ps -> Ver los contenedores ejecutándose / ejecutados

Para poder ver los contenedores ejecutándose hacemos

```bash
docker ps
```

Si en cambio queremos ver los que se han ejecutado

```bash
docker ps -a
```

Más info con el comando `docker ps --help`

### docker run -> Lanzar contenedores

Para lanzar un contenedor basta con usar (tanto las opciones como los comandos son opcionales)

```bash
docker run [<opciones>] <contenedor> [<comandos>]
```

Más info -> `docker run --help`.

#### Hello World

Para hacer un ***Hola mundo*** en Docker, lo que se hace es ejecutar un contenedor de la imagen **hello-world**. Para ello podemos bajar la imagen con `docker pull hello-world` y luego ejecutarlo. O bien ejecutarlo directamente y ya docker se encarga de bajar la imagen si n está y ejecutarla. Para ello hacemos

```bash
docker run hello-world
```

#### Puertos

Por defecto todos los contenedores tienen todos los puertos cerrados. En muchos casos tienen ciertos puertos para poder consumir un servicio y el propio contenedor te dice que puertos y que tráfico soportan. La gracia aquí está en que nosotros podemos asignarle cualquier puerto del Host a ese puerto del contenedor con la opción `-p <puerto-host>:<puerto-contenedor>`. En el ejemplo ejecuto un docker con un jenkins, y le asígno el puerto 80 de mi máquina (que es el que usan los navegadores) al puerto 8080 del contenedor (que es por donde se despacha el jenkins).

```bash
docker run -p 80:8080 jenkins
```

Esto es un buena solución en cuestiones de seguridad y de escalabilidad, ya que el contenedor tiene los puertos por defecto pero el host no.

#### Lanzar contenedor con comando

Para ver por ejemplo el filesystem del contenedor ubuntu hacemos `docker run ubuntu ls`.  

#### Contenedores interactivos

Para que el contenedor ubuntu no se pare por ejemplo, podemos acceder con la opción **interactive** y con **tty**

```bash
docker run -i -t ubuntu bash
```

Ahora estamos dentro del container y podemos ejecutar comandos o lo que queramos.

#### Asignarle un nombre al contenedor

Para asignarle un nombre al contenedor para ser usado de manera más cómoda, hay que usar la opción `--name`. Este nombre se podrá usar en sustitución del **id** del contenedor en muchos comandos, haciendo así más fácil su uso.

```bash
docker run --name perico -it ubuntu
```

Si queremos renombrar un contenedor debemos usar el comando `docker rename`.

```bash
docker rename <nombre-actual-del-contenedor> <nuevo-nombre-del-contenedor>
```

#### Salir del contenedor

* Salir del contenedor y apagarlo / matarlo:
  * Para salir del contenedor podemos ejecutar el comando `exit`
  * Usar la combinación ***Ctrl+D***.
* Salir del contenedor pero mantenerlo activo:
  * Mantener todo el rato la tecla ***Ctrl***
  * Luego pulsar ***P***
  * Después ***Q***
  * Es decir -> ***Ctrl+P***, ***D***

#### Limitar recursos

Ejemplo, limitar memoria a 500MB y solo usar hasta 2 cores

```bash
docker run -m "500mb" --cpu-set-cpus 0-1 <imagen>
```

### docker start / restart -> Arrancar un contenedor parado

Con `docker ps -a` podemos ver los contenedores que ya no están activos (`STATUS = Exited`). Si queremos volver a la lanzar uno, debemos de copiar su id (podemos usar el **name** del contenedor en lugar de su id) y ejecutar

```bash
docker start <id-contenedor>
```

También existe el comando `docker restart`

### docker attach -> Entrar en un contenedor activo

Para poder entrar dentro de un contenedor que se está ejecutando debemos de tener su id y ejecutar

```bash
docker attach <id-contenedor>
```

También podemos usar el **name** del contenedor en lugar de su id.

### docker exec -> Ejecutar comandos en un contenedor activo

Si queremos que dentro de un contenedor que ya se encuentra activo se ejecute algún comando se usa

```bash
docker exec [<opciones>] <id-o-name-contenedor> <comando> [<argumentos>]
```

### docker stop -> Parar un contenedor

Para acabar con la ejecución de un contenedor usamos el comando

```bash
docker stop <id-o-nombre-del-contenedor>
```

### docker rm / rmi -> Borrar contenedor / imagen

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

### docker history -> Ver el historial de una imagen

Para poder ver todos los pasos que ha llevado a cabo hacer una imagen se usa

```bash
docker history <id-o-name-de-la-imagen>
```

Se recomienda usar la opción `-H` para poder leerlo mejor

```bash
docker history -H <imagen>
```

Más info -> `docker history --help`

### docker logs -> Ver los logs (salidas) de un contenedor

```bash
docker logs [<opciones>] <contenedor>
```

### docker stats -> Ver consumo de recursos de un contenedor

```bash
docker stats [<opciones>] <contenedor1> <contenedor2> ...
```

### docker cp -> Copiar ficheros a / desde un contenedor activo

```bash
docker cp [<options>] <src-path> <contenedor>:<dest-path>
docker cp [<options>] <contenedor>:<src-path> <dest-path>
```

### docker inspect -> Obtener información de bajo nivel de un contenedor

```bash
docker inspect [<opciones>] <contenedor> [<contenedor2> <contenedor3> ...]
```

### docker commit -> Crear una imagen a partir de un contenedor (modificado)

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

## Dockerfile -> Crear imagen desde cero

Info oficial -> [aquí](https://docs.docker.com/engine/reference/builder/)

Para poder crear una imagen desde otra con todo lo que necesita, pero de manera más cómoda, lo que se usan son unos ficheros de texto llamados `Dockerfile`.

### Estructura / Directivas del Dockerfile

Este fichero tiene ciertas palabras clave o directivas:

* `FROM` -> Imagen base en la que se va a basar la nueva.

  ```bash
  FROM <image> [AS <name>]
  FROM <image>[:<tag>] [AS <name>]
  FROM <image>[@<digest>] [AS <name>]
  ```

  * Es la **primera** **directiva** del `Dockerfile`.
  * Puede haber varias `FROM` para usar lo que se llama el ***Multi-Stage-Build***.
  * Puede ir precedida de la directiva `ARG`

    ```bash
    ARG  CODE_VERSION=latest
    FROM base:${CODE_VERSION}
    CMD  /code/run-app

    FROM extras:${CODE_VERSION}
    CMD  /code/run-extras
    ```

* `LABEL` -> Es para añadir metadata a la imagen (autor, mantenedor, versión, etc).

  ```bash
  LABEL <key>=value<value>
  LABEL <key1>=<value1> <key2>=<value2> ...
  ```

  * Puede haber más de una `LABEL` por `Dockerfile`.
  * Consiste en un conjunto de clave-valor, y pueden ir varias por línea.
  * `MAINTAINER` -> Creador de la imagen, pero está deprecated. Usar `LABEL`.
* `RUN` -> Comandos a ejecutar ANTES de ser creada (por ejemplo, paquetes a instalarle a la imagen base).

  ```bash
  RUN <command>
  RUN ["executable", "param1", "param2"]
  ```

  * Puede haber varias directivas `RUN` en un `Dockerfile`.
  * Se debe usar comillas dobles `"` no comillas simples `'`.
* `COPY` -> Copia ficheros locales a la imagen.

  ```bash
  COPY <src> <dest>
  COPY <src1> <src2> ... <dest>
  COPY [--chown=<user>:<group>] <src> ... <dest>
  COPY [--chown=<user>:<group>] ["<src>", ... "<dest>"]
  ```

  * Puede haber varios `COPY` por `Dockerfile`.
  * `--chown` solo se puede usar en Linux (en Windows no).
* `ADD` -> Hace lo mismo que `COPY`, pero además solo copia ficheros locales. Puedes copiar contenido desde una URL, o si el fichero está comprimido, al usar `ADD` lo descomprime.

  ```bash
  ADD <src> <dest>
  ADD <src1> <src2> ... <dest>
  ADD [--chown=<user>:<group>] <src> ... <dest>
  ADD [--chown=<user>:<group>] ["<src>", ... "<dest>"]
  ```

  * Puede haber varios `ADD` en el `Dockerfile`.
  * `--chown` solo sirve en Linux (en Windows no va).
  * Se pueden usar ciertas reglas en `<src>` y `<dest>` como `*.py` (todos los ficheros que acaben en *.py*).
* `ENV` -> Variable de entorno.

  ```bash
  ENV key value
  ENV <key1>=<value1> <key2>=<value2> ...
  ```

  * Puede haber varias `ENV` por `Dockerfile`.
  * Si alguna `ENV` es igual que alguna `ARG`, la sobreescribe (`ENV` > `ARG`).
* `WORKDIR` -> Directorio de trabajo de la imagen.

  ```bash
  WORKDIR <path>
  ```

  * Puede haber varios `WORKDIR` dentro del `Dockerfile` (aunque no tiene sentido).
  * Sirve para definir el directorio con las directivas `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD`.
  * Este ejemplo hace que el directorio de trabajo sea `/a/b/c`

    ```bash
    WORKDIR /a
    WORKDIR b
    WORKDIR c
    ```

    Que se podría poner de manera más simple con

    ```bash
    WORKDIR /a/b/c
    ```

* `EXPOSE` -> Exponer por defecto un puerto del contenedor.

  ```bash
  EXPOSE <port> [<port>/<protocol> ...]
  ```

  * Puede haber varios `EXPOSE` por `Dockerfile`.
  * Si no se especifica el protocolo, por defecto toma `tcp`, pero si quieres `udp` tienes que especificarlo.
  * Si quisieras que permita los dos protocolos, se debe incluir en dos líneas.

    ```bash
    EXPOSE 80/tcp
    EXPOSE 80/udp
    ```

  * Con la opción `-p` se sobreescribe lo del Dockerfile `docker run -p 80:80/tcp 80:80/udp ...`.
  * Esto se gestiona con `docker network`.
* `USER` -> Sirve para indicar dentro del `Dockerfile` un usuario.

  ```bash
  USER <user>[:<group>]
  USER <UID>[:<GID>]
  ```

  * Puede haber varios `USER` dentro del `Dockerfile`.
  * Son para ejecutar `RUN`, `CMD` o `ENTRYPOINT` con un usuario especifico, en lugar de root.
  * El usuario por defecto de un `Dockerfile` es root.
* `VOLUME` -> Para persistencia de datos, indicamos al contenedor donde almacenar sus datos en un directorio del Docker Host (nuestra máquina).

  ```bash
  VOLUME ["/data"]
  ```

  * Esto es un concepto más avanzado y se ve en su propia sección.
* ENTRYPOINT ->
* `CMD` -> Acción por defecto al crear el contenedor.

  ```bash
  CMD ["executable", "param1", "param2"]
  CMD ["param1", "param2"]
  CMD command param1 param2
  ```

  * **Solo** puede haber **una CMD por Dockerfile**.

### .dockerignore -> Descartar ficheros para crear una imagen

El `.dockerignore` equivale al `.gitignore` de git. Es un fichero donde indicarle al `Dockerfile` que archivos y/o directorios no cargar en la imagen.

### docker build -> Construir imagen desde el Dockerfile

Por defecto el fichero se tiene que llamar `Dockerfile`, y para crear la imagen se hace

```bash
docker build
```

Si queremos usar otro fichero con otro nombre como `Dockerfile` hay que usar la opción `-f`

```bash
docker build -f <nombre-fichero-dockerfile>
```

Se recomienda usar siempre la opción `-t` para asignarle un nombre y opcionalmente un tag a la imagen. Si no se especifica el tag, docker pone por defecto `latest`

```bash
docker build -t <name>[:<tag>]
```

Se le puede indicar el path donde está el `Dockerfile`, y este path puede ser incluso una url de un repo git. Se recomienda usar

```bash
docker build -t <nombre>:<tag> <path-absoluto-hasta-el-dockerfile>
```

Más info:

* [Oficial](https://docs.docker.com/engine/reference/commandline/build/)
* `docker build --help`

### Imágenes huérfanas / colgadas -> Dangling images

Si al construir varias imágenes del mismo `Dockerfile`, estas se llaman igual (porque no hemos especificado nombres y tags distintos), solo la más nueva tiene el nombre y todas las demás quedan huérfanas. Al usar `docker images` vemos come en su `REPOSITORY` pone `<none>` y en `TAG` pasa igual. Por eso **HAY QUE USAR TAGS**.

La forma de ver todas estas imágenenes colgadas es con

```bash
docker images -f dangling=true
```

Lo lógico es borrar todas estas imágenes, para ello añadimos a la sentencia anterior `-q` para ver solo los ids y luego usar el comando `docker rmi`. Una forma automática de hacer esto es

```bash
docker images -f dangling=true -q | xargs docker rmi
```

### Multi-Stage-Build

Es probable que a veces necesitemos usar algo (fichero, carpetas, ...) de alguna imagen para poder usarlo en otra. Tendríamos dos opciones:

1. Crear una imagen con "las dos imagenes dentro", es decir, crear una imagen más pesada.
2. Generar los recursos en una imagen temporal y copiarlos a la imagen final -> Multi-Stage-Build.

La forma de hacer el paso 2. consiste en usar varios `FROM` dentro del `Dockerfile`. A cada `FROM` se asigna un alias y para poder llamar algo de esa imagen usamos la opción `--from=<alias>`. El último `FROM` es con el que se va a construir la imagen, pero los anteriores los ejecuta y podemos copiar los ficheros en las instrucciones a partir del último `FROM`. Un ejemplo

```bash
FROM <imagen-que-genera-fichero> AS <alias-de-ayuda>

# Operaciones

FROM <imagen-final>

COPY --from=<alias-de-ayuda> <fichero-src-en-la-imagen-de-arriba> <fichero-dest-en-mi-imagen-final>
```

La imagen base va a ser `<imagen-final>`, y todas las demás no entran dentro, pero si se generan para poder hacer el `COPY`.

### Buenas prácticas Dockerfile

Info oficial -> [aquí](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

* Contenedor efímero -> Fácilmente destruible
* Un servicio por contenedor
* Crear un .dockerignore para evitar archivos pesados
* Cuantas menos capas mejor:
  * Argumentos largos separados con `\`.
  * Varios argumentos en una sola capa (en vez de muchas capas).
* No instalar paquetes innecesarios (solo el servicio).
* Usar Multi-Stage-Build.
* Usar `LABEL` para documentar (versiones, descripciones, etc).

## Docker Volumes

Información oficial -> [aquí](https://docs.docker.com/storage/volumes/)

Existen 3 tipos de volumenes:

* Host Volumes -> Una carpeta del Host.
* Named Volumes -> Un volumen con nombre creado con Docker
  * No deja de ser un Host Volume pero en la carpeta `/../docker/volumes/<nombre-volumen>`
* Anonymous Volumes -> Es igual que Named Volumes solo que el nombre es un hash que asigna docker.

### Manipular (crear, listar, destruir...) volumenes con `docker volume`

```bash
# Crear volumen
docker volume create <nombre-volumen>
# Listar volumenes
docker volume ls
# Borrar volumen
docker volume rm <nombre-volumen>
```

Se recomienda asignar nombre a los volúmenes, ya que sino serán volúmenes anónimos y es más complicado nombrarlos (hay que usar su id).

### Ejecutar desde el `docker run`

```bash
# Ejecutar contenedor con un volumen host montado en el contenedor
docker run -v [<directorio-host-o-volumen-definido>:]<directorio-contenedor> -t <nombre-contenedor>
# Borrar tanto el contendor como su volumen
docker rm -v <nombre-contenedor>
```

Si no indica el `<directorio-host-o-volumen-definido>`, se creará un volumen anónimo.  

### Desde el `Dockerfile` podemos hacer lo mismo, pero solo crea volumenes anónimos

```bash
VOLUME <directorio-contenedor>
```

### Dangling Volumes

Si al borrar los contenedores, no especificamos que borre sus volumenes con `-v`, quedarán los llamados ***Dangling Volumes***. Para verlos y borrarlos

```bash
# Ver todos los volumenes dangling
docker volume ls -f dangling=true
# Listar todos los ids de los dangling volumes | Borrarlos
docker volume ls -f dangling=true -q | xargs docker volume rm
```

## Docker Network

Información oficial -> [aquí](https://docs.docker.com/network/)

```bash
docker network <command>
```

Tipos de driver de redes:

* `bridge` -> Red por defecto en los contenedores.
  * Todos los contenedores de un mismo host están (en principio) conectados a esta red.
  * Pueden comunicarse entre ellos, hacerse ping, etc.
* `host` -> Es la red del propio Docker Host.
* `none` -> Es para crear contenedor sin red.
* `overlay` -> Para conectar distintos docker daemons y permitir a docker Swarm hablar con ellos.
* `macvlan` -> Permite asignar una mac a un contenedor.
* Network Plugins -> [aquí](https://docs.docker.com/engine/extend/plugins_services/#network-plugins)

### Crear / Eliminar red

```bash
# Crear
docker network create [-d bridge] [--subnet 172.17.10.0/24] [--gateway 172.17.10.1] [--ip 172.17.10.50] <red>
# Eliminar
docker network rm <red> [<red2> <red3> ...]
```

### Inspeccionar red

```bash
docker inspect <red>
```

### Crear un contenedor conectado a una red definida

```bash
docker run --network <red> ...
```

Todos los contenedores que esten dentro de una red definida, a la hora de hacer un ping por ejemplo, no necesito poner su ip, con poner su nombre es suficiente (ya que tengo un DNS propio). Esto solo se puede hacer cuando es una red creada por mi, no en la red por defecto de docker.

### Conectar / desconectar un contenedor a una red definida

```bash
# Conectar
docker network connect [<opciones>] <red> <contenedor>
# Desconectar
docker network disconnect [<opciones>] <red> <contenedor>
```

## Docker Compose

Información oficial -> [aquí](https://docs.docker.com/compose/)

Es para aplicaciones multicontenedor.  
La nomenclatura que se sigue a la hora de nombrar el fichero es `docker-compose-<nombre>.yml`, y su formato es `YAML`.

### Instalación de Docker Compose

Información oficial -> [aquí](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### docker-compose up -> Levantar contenedores con docker-compose

Con este comando lanza docker-compose y ejecuta el fichero por defecto `docker-compose.yml`

```bash
docker-compose [-p <nombre-proyecto>] up [-d]
```

Si queremos que levante un fichero docker-compose especifico, hacemos

```bash
docker-compose [-p <nombre-proyecto>] -f <fichero-docker-compose> up [-d]
```

### docker-compose down -> Parar y eliminar todo lo que ha hecho docker-compose

```bash
docker-compose [-f <fichero-docker-compose>] down [-d]
```

### Estructura

Tiene cuatro secciones:

* version -> Indica la version de Docker-Compose que se va a usar (poner `'3'` a menos que).
  * Es OBLIGATORIA
* services -> Son los distintos servicios / contenedores que se van a crear
  * Es OBLIGATORIA
* volumes -> opcional
* networks -> opcional

```yml
version:
services:
volumes:
networks:
```

Un ejemplo con un contenedor de nginx. Si fuera por comandos haríamos

```bash
docker run -d --name nginx nginx
```

Con docker-compose

```yml
version: '3'
services:
  web:
    container_name: nginx1
    ports:
      - "8080:80"
    image: nginx
```

Y para lanzarlo

```bash
docker-compose up -d
```

Para eliminar todo lo que ha hecho el anterior fichero hacemos

```bash
docker-compose down
```

### services

* `container_name` -> Nombre del contenedor
* `image` -> Imagen con la que se va a crear
* `build` -> Ruta hasta el `Dockerfile` usar una imagen propia
  * Versión corta

    ```yml
    version: '3'
    services:
      web:
        build: .
    ```

  * Versión extendida

    ```yml
    version: '3'
    services:
    webapp:
        build:
        context: ./dir
        dockerfile: mi-dockerfile
        args:
            buildno: 1
    ```

* `command` -> Mandarle un comando, sobreescribiendo el del `Dockerfile` (si lo hubiera).
* `ports` -> Exponer los puertos
* `restart` -> Política de reinicio (información [aquí](https://docs.docker.com/config/containers/start-containers-automatically/))
  * `no` -> Por defecto.
  * `on-failure` -> Reiniciar el contenedor si hay un error.
  * `always` -> Reiniciar si el contenedor se para (si se ha parado a mano, se reiniciará cuando se reinicie el demonio de docker).
  * `unless-stopped` -> Parecido a `always` pero no se reinicia cuando se reinicia el demonio de docker.

### volumes

```yml
version: "3.2"
services:
  web:
    image: nginx:alpine
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"

volumes:
  mydata:
  dbdata:
```

### networks

```yml
version: '3'
services:
  web:
    networks:
     - some-network
     - other-network
networks:
  some-network:
  other-network:
```
