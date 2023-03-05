# Bluetooth

Cambiar el nombre del Bluetooth (hecho en Ubuntu 22.04) a un `<name>` concreto.

Tienes que averiguar la dirección MAC de tu dispositivo -> `<mac>`

Luego tienes que editar con sudo el fichero `/var/lib/bluetooth/<mac>/settings`,
en `[General]` tienes que añadir `Name=<name>`

``` bash title="/var/lib/bluetooth/<mac>/settings"
[General]
Name="<name>"
```
