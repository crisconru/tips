# Pyenv -> Distintas versiones de Python en tu sistema

TODO

Esta información está sacada de [este gran artículo de david Naranjo](https://ubunlog.com/pyenv-instala-multiples-versiones-de-python-en-tu-sistema/). Los pasos son:  

## Instalación

```bash
# 1. Instalar dependencias
sudo apt-get install -y make build-essential git libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev
# 2. Instalar pyenv en tu sistema y añadirlo a tu shell (ZSH en mi caso)
curl -L https://raw.githubusercontent.com/pyenv/pyenv-installer/master/bin/pyenv-installer | zsh
# 3. Modificar el fichero de configuración de la shell (.zshrc en mi caso)
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
# 4. Recargar la shell y usarlo
source ~/.zshrc
```

## Listar Versiones instalables

`pyenv install -l`

## Mostrar versiones Python instaladas con Pyenv

`pyenv versions`

## Instalar una version de Python

Para instalar la versión x.xx.x de Python, por ejemplo la 3.5.3, haríamos  

```bash
pyenv install 3.5.3
```

Esto instalará un interprete de Python 3.5.3 en la carpeta **~/.pyenv/versions/**

## Definir versión global del sistema

Supongamos que quisieramos cambiar la versión de Python Global del sistema. Esto se puede hacer como algo temporal, pero **NO SE RECOMIENDA DEJAR CAMBIADA LA VERSION DEL SISTEMA**.

Veamos como cambiar la versión de global de Python del sistema, y como deshacer el entuerto.

1. Supongamos que mi sistema operativo tiene por ejemplo Python **3.6.6** como versión del sistema, y se encuentra su ejecutable en **/usr/bin/python3**
2. Si quisiera usar por ejemplo Python **3.5.3** como versión global, haría lo siguiente

  ```bash
  pyenv global 3.5.3
  ```

3. Si yo ahora en mi terminal hago

  ```bash
  python3 --version
  ```

Obtendré **3.5.3** como respuesta. Pero este Python no se encuentra en **/usr/bin/**, sino que se encuentra en **~/.pyenv/versions/3.5.3/bin**

4. Si quiero deshacer este entuerno, en la terminal escribo

```bash
pyenv global system
```

Ahora si hacemos

```bash
python3 --version
```

veremos como sale por pantalla **3.6.6**. Esto lo podemos ver si ejecutamos el comando

```bash
pyenv versions
```

Y tendremos algo asi como

```bash
* system (set by /home/klin/.pyenv/version)
  3.5.3
```

Donde indica como la versión del sistema es la definida en **~/.pyenv/version**, que al ser ninguna, es la del sistema.
