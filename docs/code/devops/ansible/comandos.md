# Comandos

A los comandos que se introducen "a pelo", se les llama comandos ***Ad hoc***, y son para comprobar cosas rápido. tiene la estructura:

```bash
ansible [-i <inventario>] [<opciones>] <hosts> [-m <modulo>] [-a <comando-o-argumentos>]
```

* `<opciones>`:
    * `--limit <filtro>` -> Para poder definir a que hosts afecta.
    * `--user <usuario>`
    * `--become` -> Ser root
    * `-f <numero de procesos simultaneos>` -> Para que se haga en paralelo / simultáneamente.
* `<hosts>` -> servidores : grupos: `all` (todos los hosts).
* `modulo` -> `setup` | `ping` | `apt` | `yum` | ... Mirar la docu
* ``

## Ping

Para hacer un hello world haríamos

```bash
ansible <host> -m ping
```

Por ejemplo `ansible localhost -m ping`

## Comando normal

Para usar un comando habría que hacer

```bash
ansible <host> -a <comando>
```

Por ejemplo

```bash
ansible <host> -a hostname
```

Y te devuelve el nombre del host en la red.

## Comando para todos los hosts

```bash
ansible all ...
```

## Definir el usuario con el que vamos a realizar la acción

```bash
ansible <host> -u <usuario> -a <comando>
```

Esto se puede automatizar cambiando el fichero de host `/etc/ansible/hosts` con

```bash
<host> ansible_user=<usuario>
```

## Crear un usuario root en los hosts

```bash
ansible <host> -m user -a "name=<usuario-nuevo> state=present" --become
```

Ahora tendré que añadir la opción `--become` cada vez que quiera usar este usuario.
