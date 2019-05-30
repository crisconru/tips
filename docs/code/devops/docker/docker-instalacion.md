# Instalación

Script para la instalación de docker -> [aquí](https://get.docker.com/)

En consola haríamos

```bash
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh -y
```

Después de instalarlo deberemos darle los permisos al usuario docker para no tener que usarlo como root

```bash
sudo usermod -aG docker $USER
```

Ahora hay que cerrar sesión / logout / reiniciar, y volver a entrar para que los cambios surtan efecto. Una vez hecho esto podemos comprobar que todo funciona correctamente con los siguientes comandos (probarlos todos):

* `docker -v` -> Versión instalada en formato corto.
* `docker version` -> Versión instalada en formato extendido.
* `docker info` -> Información detallada del sistema.
* `docker` -> Lista todos los comandos de docker.
