# Dockerfile - Crear imagen desde cero

Info oficial -> [aquí](https://docs.docker.com/engine/reference/builder/)

Para poder crear una imagen desde otra con todo lo que necesita, pero de manera más cómoda, lo que se usan son unos ficheros de texto llamados `Dockerfile`.

## Estructura / Directivas del Dockerfile

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

## .dockerignore - Descartar ficheros para crear una imagen

El `.dockerignore` equivale al `.gitignore` de git. Es un fichero donde indicarle al `Dockerfile` que archivos y/o directorios no cargar en la imagen.

## docker build - Construir imagen desde el Dockerfile

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

## Imágenes huérfanas / colgadas - Dangling images

Si al construir varias imágenes del mismo `Dockerfile`, estas se llaman igual (porque no hemos especificado nombres y tags distintos), solo la más nueva tiene el nombre y todas las demás quedan huérfanas. Al usar `docker images` vemos come en su `REPOSITORY` pone `<none>` y en `TAG` pasa igual. Por eso **HAY QUE USAR TAGS**.

La forma de ver todas estas imágenenes colgadas es con

```bash
docker images -f dangling=true
```

Lo lógico es borrar todas estas imágenes, para ello añadimos a la sentencia anterior `-q` para ver solo los ids y luego usar el comando `docker rmi`. Una forma automática de hacer esto es

```bash
docker images -f dangling=true -q | xargs docker rmi
```

## Multi-Stage-Build

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

## Buenas prácticas Dockerfile

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
