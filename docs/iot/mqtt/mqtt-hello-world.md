# Primeros pasos

Vamos montar la infraestructura para poder trabajar con MQTT. Se va a usar 2 RPis, pero con un pc sirve. En uno va el broker, y en la otra el cliente.

## Broker

Se va a usar un broker [Mosquitto](https://mosquitto.org/), ya que es Open Source y muy liviano para empezar. Si se deseara un broker más potenta para el cloud, se recomienda [HiveMQ](https://www.hivemq.com/) o [VerneMQ](https://vernemq.com/).

El broker Mosquitto lo vamos a levantar con un contenedor docker, para no tener que instalar nada. Toda la información de este contenedor está aquí -> [Contenedor eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto)

```bash
docker run -it -p 1883:1883 -p 9001:9001 --name mqttbroker eclipse-mosquitto
```

Con este comando levantamos un contenedor eclipse-mosquitto, llamandolo mqttbroker, y abriendo sus puertos 1883 y 9001. Además dejaremos el contenedor abierto para ir viendo los logs que sucedan en cada comunicación.

## Cliente

Para el cliente si vamos a instalarlo, ya que ocupa poco

```bash
sudo apt install mosquitto-clients
```

Ahora abrimos 2 terminales en el cliente, uno para ser usado como publisher y otro suscriber

### `mosquitto_sub`

```bash
mosquitto_sub -h <broker> -t <topic>
```

Comando para suscribirse a un topic:

* `-h <broker>` indica el host del broker, hay que poner la ip del broker.
* `-t <topic>` indica el topic al que se va a suscribir.

### `mosquitto_pub`

```bash
mosquitto_pub -h <broker> -t <topic> -m <mensaje>
```

Comando para publicar en un topic:

* `-h <broker>` idem que antes.
* `-t <topic>` idem que antes.
* `-m <mensaje>` mensaje que se envía al topic (debe ir entre comillas dobles).

## Hola mundo

1. Tenemos el broker (con ip 192.168.1.110) en una terminal abierto, para ver sus logs.
2. En otra terminal abrimos un suscriptor con `mosquitto_sub -h 192.168.1.110 -t /casa/salon/temperatura`.
      * Veremos como en el broker aparece el nuevo cliente conectado.
      * La terminal de nuestro cliente se queda a la espera de nuevos mensajes entrantes.
3. En otra terminal publicamos con `mosquitto_pub -h 192.168.1.110 -t /casa/salon/temperatura -m "Hola mundo, hace 25ºC"`.
      * Veremos como en el broker aparecen los logs de envío
      * En el cliente suscrito sale el mensaje.
