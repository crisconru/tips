# Docker Compose

Información oficial -> [aquí](https://docs.docker.com/compose/)

Es para aplicaciones multicontenedor.  
La nomenclatura que se sigue a la hora de nombrar el fichero es `docker-compose-<nombre>.yml`, y su formato es `YAML`.

## Instalación de Docker Compose

Información oficial -> [aquí](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## docker-compose up - Levantar contenedores con docker-compose

Con este comando lanza docker-compose y ejecuta el fichero por defecto `docker-compose.yml`

```bash
docker-compose [-p <nombre-proyecto>] up [-d]
```

Si queremos que levante un fichero docker-compose especifico, hacemos

```bash
docker-compose [-p <nombre-proyecto>] -f <fichero-docker-compose> up [-d]
```

## docker-compose down - Parar y eliminar todo lo que ha hecho docker-compose

```bash
docker-compose [-f <fichero-docker-compose>] down [-d]
```

## Estructura

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

## services

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

## volumes

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

## networks

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
