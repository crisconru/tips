# Docker Network

Información oficial -> [aquí](https://docs.docker.com/network/)

## `docker network`

```bash
docker network <comando>
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

## Crear / Eliminar red

```bash
# Crear
docker network create [-d bridge] [--subnet 172.17.10.0/24] [--gateway 172.17.10.1] [--ip 172.17.10.50] <red>
# Eliminar
docker network rm <red> [<red2> <red3> ...]
```

## Inspeccionar red

```bash
docker inspect <red>
```

## Crear un contenedor conectado a una red definida

```bash
docker run --network <red> ...
```

Todos los contenedores que esten dentro de una red definida, a la hora de hacer un ping por ejemplo, no necesito poner su ip, con poner su nombre es suficiente (ya que tengo un DNS propio). Esto solo se puede hacer cuando es una red creada por mi, no en la red por defecto de docker.

## Conectar / desconectar un contenedor a una red definida

```bash
# Conectar
docker network connect [<opciones>] <red> <contenedor>
# Desconectar
docker network disconnect [<opciones>] <red> <contenedor>
```
