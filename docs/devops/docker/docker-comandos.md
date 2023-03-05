# Comandos de Docker

Todos los comandos de Docker cuentan con ayuda. Para poder verla hacemos

```bash
docker <comando> --help
```

Por ejemplo, `docker search --help` nos sacará la ayuda del comando `search`.

Para ver todos los comandos por la terminal podemos usar

```bash
docker --help
```

## `docker search` - Buscar imágenes

```bash
docker search [<opciones>] <imagen>
```

Podemos buscar imágenes tanto desde la web, como desde la terminal con el comando `docker search`. Por ejemplo si quiero buscar una imagen de Ubuntu  

```bash
docker search ubuntu
```

Y veremos la cantidad de imágenes disponibles de ubuntu que se han creado, oficiales o no, y cuantas estrellas / likes tienen. Si solo quisieramos ver por ejemplo las imagenes de ubuntu que sean de 14.04, haríamos

```bash
docker search ubuntu:14.04
```

## `docker pull` - Descargar imágenes

```bash
docker pull [<opciones>] <imagen>[:<tag>|@<digest>]
```

Para poder descargar una imagen basta con poner `docker pull <imagen>`. Por ejemplo si queremos descargar la ubuntu oficial haríamos

```bash
docker pull ubuntu
```

Pero si por ejemplo nos interesa más la ubuntu de pivotaldata, es tan sencillo como

```bash
docker pull pivotaldata/ubuntu
```

## `docker images` - Imágenes en el sistema

```bash
docker images [<opciones>] [<repositorio>[:<tag>]]
```

Con este comando podemos ver todas las imagenes que se han descargado en el sistema.

**OJO**, imagén es distinto de contenedor, podemos tener varios contenedores de la misma imagen.

```bash
docker images
```

## `docker ps` - Contenedores ejecutándose / ejecutados

```bash
docker ps [<opciones>]
```

Para poder ver los contenedores ejecutándose hacemos

```bash
docker ps
```

Si en cambio queremos ver los que se han ejecutado

```bash
docker ps -a
```

## `docker run` - Lanzar contenedores

```bash
docker run [<opciones>] <imagen> [<comando>] [<parametros>]
```

Es el **comando estrella** y sirve para lanzar un contenedor.

Se comenta con más detalle en la siguiente sección -> [Lanzar contenedores](docker-contenedores.md)

## `docker start / restart` - Arrancar un contenedor parado / pausado

```bash
docker start [<opciones>] <contenedor> [<contenedor1> <contenedor2> ...]
docker restart [<opciones>] <contenedor> [<contenedor1> <contenedor2> ...]
```

Con `docker ps -a` podemos ver los contenedores que ya no están activos (`STATUS = Exited`). Si queremos volver a la lanzar uno

```bash
docker start <id-contenedor>
```

También existe el comando `docker restart` para reiniciar un contenedor.

## `docker attach` - Entrar en un contenedor activo

```bash
docker attach [<opciones>] <contenedor>
```

Para poder entrar dentro de un contenedor que se está ejecutando y ver que se está ejecutando.

## `docker exec` - Ejecutar comandos en un contenedor activo

```bash
docker exec [<opciones>] <contenedor> <comando> [<parámetros>]
```

Si queremos que en un contenedor activo se ejecute algún comando. Por ejemplo abrir una consola

```bash
docker exec -it <contenedor> bash
```

## `docker stop` - Parar un contenedor

```bash
docker stop [<opciones>] <contenedor> [<contenedor1> <contenedor2> ...]
```

Para acabar con la ejecución de un contenedor.

## `docker rm / rmi` - Borrar contenedor / imagen

```bash
docker rm [<opciones>] <contenedor> [<contenedor1> <contenedor2> ...]
docker rmi [<opciones>] <imagen> [<imagen1> <imagen2> ...]
```

El primero sirve para borrar contenedores y el segundo para imágenes.

Si quisieramos que un contenedor se borrase una vez se dejara de ejecutar

```bash
docker run --rm <contenedor>
```

## `docker history` - Ver el historial de creacion de una imagen

```bash
docker history [<opciones>] <imagen>
```

Para poder ver todos los pasos que ha llevado a cabo hacer una imagen. Se recomienda usar la opción `-H` para poder leerlo mejor

```bash
docker history -H <imagen>
```

## `docker logs` - Ver los logs (salidas) de un contenedor

```bash
docker logs [<opciones>] <contenedor>
```

## `docker stats` - Ver consumo de recursos de un contenedor

```bash
docker stats [<opciones>] <contenedor> [<contenedor1> <contenedor2> ...]
```

## `docker cp` - Copiar ficheros a / desde un contenedor al sistema local

```bash
# Copiar del sistema al contenedor
docker cp [<optiones>] <src-path> <contenedor>:<dest-path>
# Copiar del contenedor al sistema
docker cp [<optiones>] <contenedor>:<src-path> <dest-path>
```

## `docker inspect` - Obtener información de bajo nivel de un contenedor

```bash
docker inspect [<opciones>] <contenedor> [<contenedor2> <contenedor3> ...]
```

## `docker commit` - Crear una imagen a partir de un contenedor (modificado)

```bash
docker commit [<opciones>] contenedor [<repositorio>[:<tag>]]
```

Esto se ve con más detalle en -> [Crear imágenes Docker](docker-imagenes.md)
