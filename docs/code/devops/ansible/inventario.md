# Inventario

Se llama inventario al grupo de equipos / hosts, que se van a administrar con Ansible. Los hay estáticos, es decir, un fichero, o dinámicos, que dependen de una llamada a un proveedor de cloud.

## Estático

El fichero de inventario por defecto es `/etc/ansible/hosts`, aunque se puede definir otro. Usa formato `INI`.

### Equipo local

Para que todo suceda en el propio equipo, definimos -> `localhost`.
Si queremos que no use SSH para el equipo local (cosa que tiene sentido), habría que poner `localhost ansible_connection=local`

```bash
[equipo]
localhost ansible_connection=local
```

### Equipo remoto

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

### Grupos children

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

### Variables

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

### Patrones

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

### Elegir inventario

Con la opción `-i <fichero-de-hosts>` eliges que inventario quieres, para si por ejemplo tienes diferentes entornos de desarrollo, pruebas y producción.

## Dinámico

En vez de usar un fichero local, como el `/etc/ansible/hosts`, se hace una llamada a un proveedor cloud (que es el que te lo da) a través de un script generado por los creadores de Ansible. Estos scripts están en [github.com/ansible/ansible en la sección contrib/inventory](https://github.com/ansible/ansible/tree/devel/contrib/inventory).

Para ejecutarlos, simplemente usamos el script como fichero de host, seleccionándolo con la opción `-i <script>.py`.
