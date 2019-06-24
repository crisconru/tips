# Ansible

Ansible es una herramienta de configuración de equipos (por decirlo muy resumidamente). Lo que hace es, a través de SSH, configurar equipos remotos. Estos equipos remotos no necesitan tener un agente / cliente de Ansible, solo SSH y poder usar sudo.

## Instalación

```bash
sudo apt install ansible
# El siguiente comando es para ver que está instalado correctamente
ansible --version
```

Si no lo detectara, haría falta lo siguiente

```bash
sudo apt install software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt update && sudo apt install -y ansible
```

## Configuración

Toda la configuración de Ansible se encuentra en `/etc/ansible`.  
Por un lado tenemos el fichero de configuración -> `/etc/ansible/ansible.cfg`.  
Por otro tenemos el fichero de los sistemas administrados -> `/etc/ansible/hosts`.  
Los propios ficheros tienen toda la documentación para ser usados.

## Hosts

Para que todo suceda en el propio equipo, definimos -> `localhost`.
Si queremos que no use SSH para el equipo local (cosa que tiene sentido), habría que poner `localhost ansible_connection=local`

Para que suceda en otro, añadimos su domino -> `192.168.1.135`.  
Hará falta también añadirle una clave SSH al host que se va a configurar con Ansible

```bash
# Generar clave (poner passphrase por seguridad)
ssh-keygen -t <algoritmo-cifrado>
# ssh-keygen -t rsa

# Copiar clave al host
ssh-copy-id -i <ruta-clave-privada> <usuario-host>@<host>
# ssh-copy-id ~/.ssh/id_rsa pi@raspberrypi
```

## Comandos

### Ping

Para hacer un hello world haríamos

```bash
ansible <host> -m ping
```

Por ejemplo `ansible localhost -m ping`

### Comando normal

Para usar un comando habría que hacer

```bash
ansible <host> -a <comando>
```

Por ejemplo

```bash
ansible <host> -a hostname
```

Y te devuelve el nombre del host en la red.

### Comando para todos los hosts

```bash
ansible all ...
```

### Definir el usuario con el que vamos a realizar la acción

```bash
ansible <host> -u <usuario> -a <comando>
```

Esto se puede automatizar cambiando el fichero de host con

```bash
<host> ansible_user=<usuario>
```

### Crear un usuario root en los hosts

```bash
ansible <host> -m user -a "name=<usuario-nuevo> state=present" --become
```

Ahora tendré que añadir la opción `--become` cada vez que quiera usar este usuario.
