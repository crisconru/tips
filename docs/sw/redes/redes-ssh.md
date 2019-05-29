# SSH

## Instalación y configuración

### Servidor

Instalación

```bash
sudo apt install openssh-server
```

Esto genera 4 pares de ficheros de clave pública-privada en el servidor con 4 algoritmos de cifrado:

| Algoritmo | Fichero Clave Privada | Fichero Clave Pública |
|:-:|:-:|:-:|
| DSA | ssh_host_dsa_key | ssh_host_dsa_key.pub |
| ECDSA | ssh_host_ecdsa_key | ssh_host_ecdsa_key.pub |
| ED25519 | ssh_host_ed25519_key | ssh_host_ed25519_key.pub |
| RSA | ssh_host_rsa_key | ssh_host_rsa_key.pub |

Configuración en `/etc/ssh/sshd_config`.

Una buena práctica es configurar que el acceso por **root** solo se haga a través de clave pública con

```bash
PermitRootLogin without-password
```

### Cliente

Instalación

```bash
sudo apt install openssh-client
```

Configuración en `/etc/ssh/ssh_config`  

## Acceso con usuario-contraseña

Lo típico para iniciar sesión en SSH es usar las credenciales del usuario y contraseña

```bash
ssh <usuario>@<ip>
```

O también se puede usar  

```bash
ssh -l <usuarios> <ip>
```

Luego nos pedirá la contraseña, y la primera vez nos pedirá aceptar la conexión.

### Ejecutar comandos sin abrir una terminal remota

También se pueden ejecutar comandos o scripts sin abrir una consola remota

```bash
ssh <user>@<ip> <comando>
ssh <user>@<ip> '<script>'
```  

## Acceso con par clave público-privada sin passphrase

Lo lógico en SSH es usar el par claves público-privada para acceder por SSH, y no tener que estar poniendo usuario-contraseña cada vez que queremos acceder (a parte de que es menos inseguro).

1. Crear par de clave privada-pública (en el equipo local):

    * Para crear el par de claves usamos el comando
  
      ```bash
      ssh-keygen -t <algoritmo>
      ```

      * `<algortimo>` -> `dsa` | `ed25519` | `rsa` | `rsa1`
    * Saldrá un diálogo y nos pedirá el nombre para el fichero.
    * También nos pedirá un `passphrase` (frase de paso), que es opcional, lo dejamos en blanco.
      * Esto lo vemos en la siguiente sección.
    * Esto generará dos ficheros, por ejemplo si usamos rsa y el nombre por defecto, tendremos:
      * En **~/.ssh/** los ficheros de claves.
      * **id_rsa** clave privada.
      * **id_rsa.pub** clave pública.

2. Copiar clave pública (en el equipo remoto):
  
    * Para poder acceder con este método, hay que "publicar" la clave pública en el equipo remoto.
    * Esto consiste en meter la clave pública en el fichero **~/.ssh/authorized_keys** del equipo remoto.
    * Hay varios métodos pero el más sencillo es con el comando
  
      ```bash
      ssh-copy-id -i <ruta al fichero de clave privada> <usuario>@<ip>
      ```

    * Por ejemplo, si queremos copiar nuestra rsa clave que está en **~/.ssh/** en el equipo con usuario **pepe** con la ip **192.168.1.13** haremos  

      ```bash
      ssh-copy-id -i ~/.ssh/id_rsa pepe@192.168.1.13
      ```

Ahora para acceder no nos pedirá contraseña.  
Ventajas:

* Es más seguro
* Si se cambia el password del usuario, nosotros no necesitaremos saberlo (no nos afecta).

## Acceso con par público-privada con passphrase

El passphrase es un second factor authentication. Si añadimos una passphrase a nuestro par de claves, al acceder por ssh nos la pedirá, como cuando accedemos por usuario y la contraseña.

Ventajas:

* Es más seguro.
* Si alguien nos roba la clave privada, no podrá usarla si no sabe la passphrase.

Para que sea más cómodo esto, usamos el programa **ssh-agent**, y así solo tendremos que poner el passphrase la primera vez y ya está.

### ssh-agent

El programa / servicio `ssh-agent` nos permite no tener que estar introduciendo la passphrase cada vez que nos conectemos. Lo ponemos una vez y listo. Los pasos para que todo esto funcionen son:

1. Comprobamos que esté ejecutando ssh-agent

    ```bash
    ps aux | grep ssh-agent
    ```

    * Si no se está ejecutando lo activamos con

      ```bash
      ssh-agent /bin/bash
      ```

2. Una vez se está ejecutando, se añade la clave privada

    ```bash
    ssh-add <ruta fichero clave privada>
    ```

    * Por ejemplo

      ```bash
      ssh-add ~/.ssh/id_rsa
      ```

3. Utilidades de **ssh-agent**:
    * Ver las claves cargadas

      ```bash
      ssh-add -L
      ```

    * Ver sus huellas

      ```bash
      ssh-add -l
      ```

    * Para eliminar una clave

      ```bash
      ssh-add -d <fichero-clave-privada>
      ```

    * Eliminar todas las claves

      ```bash
      ssh-add -D
      ```

4. Crear clave pública (si no existe) desde la clave privada

    * Supongamos que por lo que sea solo tenemos una clave privada y queremos generar la pública
  
      ```bash
      ssh-keygen -y -f <fichero clave privada> >> <fichero clave pública>
      ```

        * Por ejemplo

          ```bash
          ssh-keygen -y -f id_rsa >> id_rsa.pub
          ```

    * El proceso inverso, sacar la privada de la pública, no es posible.

## authorized_keys -> Gestionar accesos a mi equipo

El servidor SSH guarda las claves públicas autorizadas para que puedan en el fichero `~/.ssh/authorized_keys`. Si quisiera que una clave pública no se pudiera usar para acceder en mi servidor, la borro de ese fichero.

El formato que tiene cada línea es

```bash
<tipo-clave> <clave-pública-cliente> <comentario>
```

El `<tipo-clave>` me dice el algoritmo con el que se ha creado.  
La `<clave-publica-cliente>` es la clave del cliente que se va a conectar a mi equipo.  
El `<comentario>` suele ser el `<usuario>@<equipo>`.

## known_hosts -> Gestionar equipos a los que accedo

El cliente tiene un control de todos los servidores SSH a los que se conecta. Esto lo hace guardando las claves públicas de los servidores en el fichero `~/.ssh/known_hosts`.

Tiene 3 campos

```bash
<hash-ip-equipo-remoto> <tipo-clave> <clave-publica-servidor>
```

### Problemas con acceso a la misma ip pero distintos hosts

Supongamos que yo tenía un pc al que accedía con la ip `192.168.1.120`. Por lo que sea, he formateado y trato de volver a acceder a esa máquina formateada. Lo más seguro es que me salga un mensaje de error diciendome que el **remote host** ha cambiado (del que yo tenía guardado), y puedo sufrir un ataque **man-in-the-middle**. Si estamos completamente seguros que no hay nadie en medio, y accedo directamente a mi máquina, l que debemos hacer es borrar el `known_hosts` el anterior equipo. Tranquilos, que el propio comando te lo dan en el mensaje de ayuda, solo hay que hacer copia-pega. El comando es así:

```bash
ssh-keygen [-f "<path-to-known_hosts>"] -R <ip>
```

En nuestro caso sería `ssh-keygen -f "~/.ssh/known_hosts" -R 192.168.1.120`. La parte de `-f "~/.ssh/known_hosts"` es opcional, podríamos hacer `ssh-keygen -R 192.168.1.120` y sería totalmente válido.

## Forwarding

Esta técnica permite reenviar "algo", desde un equipo al otro, pasando por otro.

### Agent Forwarding

Imaginemos que existen 3 máquinas, A, B, C, y tenemos el siguiente problema:

* A <-> B = A y B se pueden comunicar por SSH.
* B <-> C = B y C se pueden comunicar por SSH.
* A </> C = A y C no se pueden comunicar por SSH.

Agent forwarding nos permite que A <-> C a través de B, es decir A <-B-> C.

Esto es posible haciendo:

1. Activando en el servidor de B `/etc/ssh/sshd_config` la opción

    ```bash
    AllowAgentForwarding yes
    ```

2. Activando en el agente / cliente de B `/etc/ssh/ssh_config` la opción

    ```bash
    ForwardAgent yes
    ```

Así ahora, para hacer A <-> C, lo que haría es:

1. Accedo desde A por SSH a B = A -> B.
2. Accedo desde B por SSH a C = B -> C.

Y ahora en la shell veré que estoy en C. Parece obvio, pero si estas opciones no están activadas, no se podría hacer.

La idea al final de todo esto, es que si tengo muchas máquinas C's: C1, C2, C3, etc. Es recomendable que no estén expuestas al exterior. Lo mejor es tener un "bastión", es decir, una máquina B, que está autenticada con claves publico-privada + passphrase con cada Cx, y yo desde A solo tengo acceso a B.

### X11 Forwarding

Si accedo por SSH de una máquina A a otra B, A -> B, y ejecuto una aplicación gráfica (X11), no la veo en mi equipo A, solo se ve en el equipo B. La forma de poder ver en A una app X11 ejecutada en B es con la técnica X11 forwarding. Para poder aplicar esta técnica tengo que:

* Habilitar en el servidor de B `/etc/ssh/sshd_config` las opciones

    ```bash
    X11Forwarding yes
    X11DisplayOffset 10
    ```

Si lo que quiero es ejecutar una aplicación gráfica de C en mi máquina A, debo de:

* Habilitar en el cliente/agente de B `/etc/ssh/ssh_config` la opción

    ```bash
    FordwardX11 yes
    ```

Al ejecutar una app X11 remota, aunque la vea en mi equipo local, los recursos que consume son de la máquina remota.

## Transferir ficheros por SSH

SSH no solo permite iniciar sesiones o ejecutar comandos en remoto. También permite la transferencia de ficheros a través de dos protocolos, SCP y SFTP.

### SCP

SCP es un protocolo que se puede usar con SSH para poder compartir ficheros. Su sintaxis es similar a la `cp`, pero "generalizada"

```bash
scp [[<usuario-origen>@]<host-origen>:]<fichero-origen> [[<usuario-destino>@]<host-destino>:]<fichero-destino>
scp -r [[<usuario-origen>@]<host-origen>:]<directorio-origen> [[<usuario-destino>@]<host-destino>:]<directorio-destino>
```

Visto así es muy lioso, vamos a verlo con ejemplos.

|Máquina|Usuario|Host|
|:-:|:-:|:-:|
|A|usera|192.168.1.120|
|B|userb|192.168.1.121|
|C|userc|192.168.1.122|

En todos los ejemplos voy a suponer que estoy en la máquina A:

* Pasar fichero `mifichero.txt` en el `$HOME` origen, a la carpeta `micarpeta` del `$HOME` destino
  * A -> B (de local a remoto)

      ```bash
      scp $HOME/mifichero.txt userb@192.168.1.121:$HOME/micarpeta/
      ```

  * B -> A (de remoto a local)

      ```bash
      scp userb@192.168.121:$HOME/fichero.txt $HOME/micarpeta/
      ```

  * B -> C (de remoto a remoto)

    ```bash
    scp userb@192.168.1.121:$HOME/fichero.txt userc@192.168.1.122:$HOME/micarpeta/
    ```

* Pasar la carpeta `micarpeta` del `$HOME` origen al `$HOME` destino
  * A -> B (de local a remoto)

    ```bash
    scp -r $HOME/micarpeta userb@192.168.1.121:$HOME/
    ```

  * B -> A (de remoto a local)

    ```bash
    scp -r userb@192.168.1.121:$HOME/micarpeta $HOME/
    ```

  * B -> C (de remoto a remoto)

    ```bash
    scp -r userb@192.168.1.121:$HOME/micarpeta userc@192.168.1.122:$HOME/
    ```

### SFTP

SFTP es SSH FTP, es decir, una comunicación FTP sobre SSH. No confundir con FTPS, que es una variación de FTP securizada. Para usarla hacemos

```bash
sftp <usuario>@<host>
```

Se nos abrirá una shell que podemos usar como si fuera una shell FTP. También podemos abrir una conexión SFTP desde cualquier programa FTP cliente como Filezilla

## Túneles SSH

Esto se conoce como Port Fordwarding o TCP Fordwarding. Supongamos que tenemos:

|Maquina|Usuario|Host|Puerto|SSH|
|:-:|:-:|:-:|:-:|:-:|
|A|usera|hosta|porta|A<->B|
|B|userb|hostb|portb|B<->A, B<->C|
|C|userc|hostc|portc|C<->B|

Con este escenario, tenemos 3 tipos de túneles:

* Local Fordwarding (-L): Traer un puerto (servicio) remoto (de A ó C) a uno local (de C ó A) por B.
* Remote Fordwarding (-R): Enviar un puerto (servicio) local (de A ó C) a uno remoto (de C ó A) por B.
* Dynamic Fordwarding (-D): ni idea

Básicamente consiste en traer / enviar un puerto local / remoto desde una máquina a otra, pasando por una máquina intermedia.

### Local Fordwarding

Local Fordwarding consiste en traer un puerto remoto (de otra máquina) a un puerto de mi máquina local. Es decir, es como si desde mi puerto local estuviera en el puerto remoto de la otra máquina.

Comando y variantes:

```bash
ssh -f -N -L [<bind-address>:]<port>:<host>:<host-port> [<user>@<host>]
ssh -f -N -L [<bind-address>:]<port>:<remote-socket> [<user>@<host>]
ssh -f -N -L <local-socket>:<host>:<host-port> [<user>@<host>]
ssh -f -N -L <local-socket>:<remote-socket> [<user>@<host>]
```

Supongamos que A con acceso libre a Internet, y C con acceso restringido Internet (no puede acceder a ciertos servicios / web). Así que nos interesaría:

* Desde C, traer hosta:porta a hostc:portc, por B

    ```bash
    ssh -f -NL portc:hosta:porta userb@hostb
    ```

Ahora supongamos que C tiene un servicio NGINX en su puerto 80, y lo queremos poder consumir:

* Desde A, traer el puerto 80 de C al puerto 1080 de A, por B

    ```bash
    ssh -f -NL 1080:hostc:80 userb@hostb
    ```

* También podríamos hacer:
  1. Desde B, traer el pierto de C al puerto 1080 de B

      ```bash
      ssh -f -NL
      ```

  2. Desde A, consumir ese NGINX accediendo en el navegador a `hostb:1080`

### Remote Forwarding

Remote Fordwarding consiste en enviar un puerto local (de mi máquina) a un puerto de una máquina remota. Es decir, es como si desde un puerto de una máquina remota estuviera en el puerto de mi máquina local.

Comando y sus variantes:

```bash
ssh -f -N -R [<bind-address>:]<port>:<host>:<host-port> [<user>@<host>]
ssh -f -N -R [<bind-address>:]<port>:<local-socket> [<user>@<host>]
ssh -f -N -R <remote-socket>:<host>:<host-port> [<user>@<host>]
ssh -f -N -R <remote-socket>:<local-socket> [<user>@<host>]
ssh -f -N -R [<bind-address>:]<port> [<user>@<host>]
```

Supongamos que 

### Dynamic Fordwarding

```bash
ssh -f -N -D [<bind-address>:]<port>
```

## Conexión a Github con par clave público-privada

1. Generar par de claves con passphrase mediante

    ```bash
    ssh-keygen -t rsa -b 4096 -C "<github email>"
    ```

2. Añadir la clave al ssh-agent  

    ```bash
    ssh-add -K <ruta al fichero de clave privada>
    ```

3. Añadir la clave pública en Github
   1. Copiar la clave pública en el clipboard

       ```bash
       pbcopy < <ruta al fichero de clave pública>
       ```

   2. Pegar la clave pública en Github
      1. Ir a **Settings** -> **SSH and GPG Keys** -> **New SSH** or **Add SSH Key**
      2. Poner un título para que se entienda de que equipo es la clave y pegar la clave en el campo **Key**
      3. Por último, darle al botón **Add SSH key**, confirmar y listo.
