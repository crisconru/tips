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

* `/etc/ansible` -> Carpeta con los ficheros de configuración:
    * `/etc/ansible/ansible.cfg` -> Configuración.
    * `/etc/ansible/hosts` -> Inventario de equipos administrados.

## Inventario

Se llama inventario al grupo de equipos / hosts, que se van a administrar con Ansible. Los hay estáticos, es decir, un fichero, o dinámicos, que dependen de una llamada a un proveedor de cloud.

### Estático

El fichero de inventario por defecto es `/etc/ansible/hosts`, aunque se puede definir otro. Usa formato `INI`.

#### Equipo local

Para que todo suceda en el propio equipo, definimos -> `localhost`.
Si queremos que no use SSH para el equipo local (cosa que tiene sentido), habría que poner `localhost ansible_connection=local`

```bash
[equipo]
localhost ansible_connection=local
```

#### Equipo remoto

Para actuar sobre un equipo remoto tienes que añadirle una clave SSH al host que se va a configurar con Ansible

```bash
# Generar clave (poner passphrase por seguridad)
ssh-keygen -t <algoritmo-cifrado>
# ssh-keygen -t rsa

# Copiar clave al host
ssh-copy-id -i <ruta-clave-privada> <usuario-host>@<host>
# ssh-copy-id ~/.ssh/id_rsa pi@raspberrypi
```

Luego debes añadirlo al inventario

```bash
[rpis]
raspberrypi
192.168.0.101
```

#### Grupos children

Suponte que tienes dos grupos distintos, que quieres actuar tanto por separado, como conjuntamente, para ello tienes que usar la directiva `:children`.

```bash
[raspbian]
raspberrypi

[ubuntu]
192.168.0.101

[rpis:children]
raspbian
ubuntu
```

#### Variables

Usa la directiva `:vars`.

```bash
[rpis:children]
raspbian
ubuntu

[rpis:vars]
# variables
```

Tienen prioridad las variables directas / locales de cada host, por encima de las del grupo, ejemplo:

```bash
[raspbian]
raspberrypi <variable>=<valor1>

[rpis:children]
raspbian

[rpis:vars]
<variable>=<valor2>
```

En este caso, `<variable>` tendrá `<valor1>`.

Se pueden agrupar las variables en:

* `/etc/ansible/host_vars/<host>.yml` -> Un fichero yaml de variables para cada host.
* `/etc/ansible/group_vars/<grupo>.yml` -> Un fichero yaml de variables para cada grupo de hosts.

Las variables irán en formato YAML, es decir, `<variable>: <valor>`.

Algunas variables:

* `ansible_connection` -> `ssh` (por defecto) | `local`.
    * `ansible_connection=ssh`:
        * `ansible_host`
        * `ansible_port`
        * `ansible_user`
        * `ansible_ssh_private_key_file`

        ```bash
        [raspbian]
        rpi1 ansible_host=192.168.0.101 ansible_user=pi
        ```

* `ansible_become` -> `false` (por defecto) | `true`
    * `ansible_become=true`:
        * `ansible_become_method` -> `su` | `sudo`
        * `ansible_become_user` (root)

#### Patrones

Si tienes varios hosts con nombres como

```bash
web1.domino.com
web2.dominio.com
web3.dominio.com
```

Te puedes referir a ellos como `web[1:3].dominio.com`.

Si en cambio tienes

```bash
web-a.dominio.com
web-b.dominio.com
web-c.dominio.com
```

Puedes usar `web-[a:c].dominio.com`.

#### Elegir inventario

Con la opción `-i <fichero-de-hosts>` eliges que inventario quieres, para si por ejemplo tienes diferentes entornos de desarrollo, pruebas y producción.

### Dinámico

En vez de usar un fichero local, como el `/etc/ansible/hosts`, se hace una llamada a un proveedor cloud (que es el que te lo da) a través de un script generado por los creadores de Ansible. Estos scripts están en [github.com/ansible/ansible en la sección contrib/inventory](https://github.com/ansible/ansible/tree/devel/contrib/inventory).

Para ejecutarlos, simplemente usamos el script como fichero de host, seleccionándolo con la opción `-i <script>.py`.

### Combinar inventarios

Si en un directorio / carpeta tienes un inventario estático y otro dinámico, con especificar con `-i` ese directorio, usará primero el estático y luego el dinámico.

Se recomienda usar la opción `--list-hosts` al menos la primera vez para comprobar que haga la unión de los inventarios.

## Comandos

A los comandos que se introducen "a pelo", se les llama comandos ***Ad hoc***, y son para comprobar cosas rápido. tiene la estructura:

```bash
ansible [-i <inventario>] [<opciones>] <hosts> [-m <modulo>] [-a <comando-o-argumentos>]
```

* `<opciones>`:
    * `--limit <filtro>` -> Para poder definir a que hosts afecta. `<filtro>` puede ser
        * `host1,host2,host3,...` -> Lista de hosts.
        * `grupo1:grupo2:grupo3:...` -> Lista de grupos.
        * `grupo1:&grupo2` -> La intersección / lo común de grupo1 y grupo2.
        * `grupo1:!grupo2` -> Grupo 1 excepto lo común / intersección de grupo 2.
    * `--user <usuario>`
    * `--become` -> Ser root
    * `-f <numero de procesos simultaneos>` -> Para que se haga en paralelo / simultáneamente.
* `<hosts>` -> servidores : grupos: `all` (todos los hosts).
* `modulo` -> `setup` | `ping` | `apt` | `yum` | ... Mirar la docu
* ``

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

Esto se puede automatizar cambiando el fichero de host `/etc/ansible/hosts` con

```bash
<host> ansible_user=<usuario>
```

### Crear un usuario root en los hosts

```bash
ansible <host> -m user -a "name=<usuario-nuevo> state=present" --become
```

Ahora tendré que añadir la opción `--become` cada vez que quiera usar este usuario.

## Configuración

Todo está autodocumentado en el fichero de configuración global `/etc/ansible/ansible.cfg`:

* Contiene valores por defecto.
* Configuración de escalar permisos.
* Opciones de OpenSSH.
* Opciones de SELinux.
* Configuración de [Ansible Galaxy](https://galaxy.ansible.com/).

La priorización de busqueda de archivos de configuración es:

1. Variable de entorno `ANSIBLE_CONFIG`.
2. Fichero locales `ansible.cfg` y `.ansible.cfg`.
3. Fichero global `/etc/ansible/ansible.cfg`.

### Windows

Info oficial -> [aquí](https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1).

Para poder ser usado en máquinas Windows hace falta:

* En la máquina con Ansible:
    * Instalar pywinrm -> `pip install pywinrm`.
    * Definir `connection` al valor `winrm` -> `-c winrm`.
* En la máquina Windows:
    * Tener `PowerShell 3.0` o superior.
    * Habilitar control remoto con el script [ConfigureRemotingForAnsible.ps1](https://github.com/ansible/ansible/blob/devel/examples/scripts/ConfigureRemotingForAnsible.ps1) desde la web de Ansible.
    * Habilitar puerto `5986`.
* Ignorar certificado SSL -> `ansible_winrm_server_cert_validation=ignore`.

## Playbook

Un playbook es un fichero con un conjunto de recetas (tareas) ordenadas, para no tener que ir introduciendo todo a mano con comandos ad hoc. Usa formato YAML.

```yaml
---
- name: Mi playbook
  hosts: all
  remote_user: pi
  become: true
  tasks:
    - name: copiar fichero hosts
      copy: src=/etc/hosts dest=/etc/hosts
```

Para ejecutarlo

```bash
ansible-playbook [-i <inventario>] [<opciones>] <fichero.yml>
```

### Opciones

* `-i <inventario>` -> Indicar el inventario en formato fichero (estático) / script (dinámico) / directorio (estático + dinámico).
* `--syntax-check` -> Comprobar sintaxus del playbook.
* `--list-tasks` -> Listar tareas.
* `--step` -> Pregunta paso a paso.
* `--start-at-task=<tarea>` -> Empezar por una tarea concreta.
* `--forks=<num de tareas> | -f <num de tareas>` -> Cantidad de tareas en paralelo (por defecto `<num de tareas>` es `5`).
* `-v | -vv | -vvv` -> Aumentar el `verbose` (información de cada operación que se hace).

### Variables

TODO:
