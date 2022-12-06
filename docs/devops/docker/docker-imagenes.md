# Imágenes Docker

TODO

## Crear imágenes con *docker commit*

Supongamos que hemos abierto un contenedor, hemos modificado cosas y lo tenemos listo para trabajar. Si queremos crear una imagen así para poder usarla, lo que haríamos sería

```bash
docker commit <contenedor-modificado> <imagen-nueva>
```

Podemos además ejecutar comandos previos al commit para crear la nueva imagen. Por ejemplo, supongamos una imagen de ubuntu que le hemos instalado el servidor Apache2 y hemos lanzado el servicio. Con el siguiente comando exponemos el puerto 85 del contenedor y tenemos el apache2 en primer plano.

```bash
docker commit --change='CMD ["apache2ctl", "-D FOREGROUND"]' -c "EXPOSE 85" <contenedor> <nueva-imagen>
```
