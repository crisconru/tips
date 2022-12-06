# MQTT

Referencia -> [aquí](https://programarfacil.com/esp8266/mqtt-esp8266-raspberry-pi/)

MQTT es un protocolo de mensajería para IoT, que va montando sobre la capa TCP, pensado para comunicaciones M2M.

## Arquitectura

Hay dos elementos:

* Cliente
* Servidor (broker)

La arquitectura consiste en publicación-suscripción:

* Un cliente publica un topic dentro del broker.
* Un cliente le dice al broker a que topic se suscribe.

## Topic

Un topic es el asunto / tema del mensaje.

Van jerarquizados, separados por `/` y dentro de categorías. Por ejemplo:

* Hay definido un topic `tv`
* Está dentro de la categoría `salón`
* Esta a su vez en la categoría `casa`
* El topic se referencia `/casa/salon/tv`

Un cliente (o varios) se pueden suscribir a uno o varios topic, y también a las categorías (todos los topics que tienen por debajo).

Existen dos operadores para ayudar a la suscripción, `+` y `#`:

* Con `+` sustituye cualquier categoría / nivel -> `/casa/+/tv` = Suscribirse a todos los topic `tv` de la `/casa`.
* Con `#` sustituye cualquier categoría / nivel inferior -> `/casa/#` = Suscribirse a todos los topic de la `/casa`.

## Mensajes

Tienen 3 partes:

1. Encabezado fijo -> 2B (2 Bytes), es obligatorio
2. Encabezado variable -> 4b (4 bits), no es obligatorio.
3. Mensaje (payload) -> Hasta 2-4 kB (teoricamente hasta 256MB).

Se envían asíncronamente.

El broker:

* Es el único que sabe que cliente está suscrito a cada topic, luego los clientes son independientes.
* Puede almacenar mensajes hasta que los lea el o los suscriptores.
* Cada cliente abre una conexión MQTT con el broker (algo asi como un socket).

Existe QoS, permitiendo información fiable (o no). Hay 3 grados de QoS:

* QoS 0 -> Enviar solo 1 vez -> Puede que se pierda mensaje.
* QoS 1 -> Permite al menos 1 reenvío -> Se garantiza entrega del mensaje, pero puede haber duplicidad.
* QoS 2 -> Llega 1 vez -> Se garantiza que el mensaje llega 1 sola vez.

A mayor calidad, menos rendimiento.

## Primeros pasos

Vamos montar la infraestructura para poder trabajar con MQTT. Se va a usar 2 RPis, pero con un pc sirve. En uno va el broker, y en la otra el cliente.

### Broker

Se va a usar un broker [Mosquitto](https://mosquitto.org/), ya que es Open Source y muy liviano para empezar. Si se deseara un broker más potenta para el cloud, se recomienda [HiveMQ](https://www.hivemq.com/) o [VerneMQ](https://vernemq.com/).

El broker Mosquitto lo vamos a levantar con un contenedor docker, para no tener que instalar nada. Toda la información de este contenedor está aquí -> [Contenedor eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto)

```bash
docker run -it -p 1883:1883 -p 9001:9001 --name mqttbroker eclipse-mosquitto
```

Con este comando levantamos un contenedor eclipse-mosquitto, llamandolo mqttbroker, y abriendo sus puertos 1883 y 9001. Además dejaremos el contenedor abierto para ir viendo los logs que sucedan en cada comunicación.

### Cliente

Para el cliente si vamos a instalarlo, ya que ocupa poco

```bash
sudo apt install mosquitto-clients
```

Ahora abrimos 2 terminales en el cliente, uno para ser usado como publisher y otro suscriber

#### `mosquitto_sub`

```bash
mosquitto_sub -h <broker> -t <topic>
```

Comando para suscribirse a un topic:

* `-h <broker>` indica el host del broker, hay que poner la ip del broker.
* `-t <topic>` indica el topic al que se va a suscribir.

#### `mosquitto_pub`

```bash
mosquitto_pub -h <broker> -t <topic> -m <mensaje>
```

Comando para publicar en un topic:

* `-h <broker>` idem que antes.
* `-t <topic>` idem que antes.
* `-m <mensaje>` mensaje que se envía al topic (debe ir entre comillas dobles).

### Hola mundo

1. Tenemos el broker (con ip 192.168.1.110) en una terminal abierto, para ver sus logs.
2. En otra terminal abrimos un suscriptor con `mosquitto_sub -h 192.168.1.110 -t /casa/salon/temperatura`.
      * Veremos como en el broker aparece el nuevo cliente conectado.
      * La terminal de nuestro cliente se queda a la espera de nuevos mensajes entrantes.
3. En otra terminal publicamos con `mosquitto_pub -h 192.168.1.110 -t /casa/salon/temperatura -m "Hola mundo, hace 25ºC"`.
      * Veremos como en el broker aparecen los logs de envío
      * En el cliente suscrito sale el mensaje.
