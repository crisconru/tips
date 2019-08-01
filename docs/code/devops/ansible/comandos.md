# Comandos

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
