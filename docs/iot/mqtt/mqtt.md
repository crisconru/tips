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
