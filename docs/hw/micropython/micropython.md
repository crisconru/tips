# Micropython

La información oficial de Micropython está en su web -> [Documentación Oficial](http://docs.micropython.org/en/latest/index.html)  

## Preparar placa ESP8266 con Micropython

Enlaces de ayuda:

* El tutorial oficial (en inglés) está -> [aquí](http://docs.micropython.org/en/latest/esp8266/tutorial/intro.html).
* Se recomienda el tutorial en español de Python Canarias -> [aquí](https://github.com/pythoncanarias/upython#pasos-previos).

Para instalar micropython en nuestra placa hay que seguir los siguientes pasos:

1. **Instalar** `esptool` en Python (se recomienda usar un virtualenv).

   ```bash
   pip install esptool
   ```

   Con el comando `esptool.py --help` podemos ver todas las opciones.
   **NOTA**: Si estas en **Windows** o **Mac**, tienes que **instalar** los **drivers** del chip **CH340** / **CH341** (son los que permiten la comunicación por el USB).

   * Windows -> [aquí](http://www.wch.cn/download/CH341SER_EXE.html)
   * Mac -> [aquí](http://www.mblock.cc/docs/run-makeblock-ch340-ch341-on-mac-os-sierra/)
  
2. **Descargar** el **firmware** (se recomienda el último estable) -> [aquí](http://micropython.org/download#esp8266).
3. **Conectar** la **placa** por el **USB** y **descubrir** en que **puerto** está conectada.
4. **Borrar** la **flash** de la placa con el comando

   ```bash
   esptool.py --port <puerto> erase_flash
   ```

   Por ejemplo  

   ```bash
   esptool.py --port /dev/ttyUSB0 erase_flash
   ```

5. **Flashear** la **placa** con el **firmware**

   ```bash
   esptool.py --port <port> --baud <baudios> write_flash --flash_size=detect 0 <fichero-de-firmware>
   ```

   Por ejemplo  

   ```bash
   esptool.py --port /dev/ttyUSB0 --baud 115200 write_flash --flash_size=detect 0 esp8266-20190125-v1.10.bin
   ```

   En algunas placas es probable que dé error y haya que añadir la opción `-fm dio`, ejemplo  

   ```bash
   esptool.py --port /dev/ttyUSB0 --baud 115200 write_flash --flash_size=detect -fm dio 0 esp8266-20190125-v1.10.bin
   ```

## Preparar placa ESP32 con Micropython

Enlaces de ayuda:

* El tutorial oficial (en inglés) -> [aquí](http://docs.micropython.org/en/latest/esp32/tutorial/intro.html).
* Tutorial español de [Zerasul](https://github.com/zerasul) -> [aquí](https://github.com/zerasul/upython-book/blob/master/instalacion.md).

Para instalar micropython en nuestra placa hay que seguir los siguientes pasos:

1. **Instalar** `esptool` en Python (se recomienda usar un virtualenv).

   ```bash
   pip install esptool
   ```

   Con el comando `esptool.py --help` podemos ver todas las opciones.

2. **Descargar** el **firmware** (se recomienda el último estable) -> [aquí](http://micropython.org/download#esp32).
3. **Conectar** la **placa** por el **USB** y descubrir en que **puerto** está conectada.
4. **Borrar** la **flash** de la placa con el comando

   ```bash
   esptool.py --port <puerto> erase_flash
   ```

   Por ejemplo

   ```bash
   esptool.py --port /dev/ttyUSB0 erase_flash
   ```

5. **Flashear** la **placa** con el **firmware**

   ```bash
   esptool.py --chip esp32 --port <port> --baud <baudios> write_flash -z 0x1000 <fichero-de-firmware>
   ```

   Por ejemplo

   ```bash
   esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 write_flash -z 0x1000 esp32-20190125-v1.10.bin
   ```

   En algunas placas es probable que dé error y haya que añadir la opción `-fm dio`, ejemplo

   ```bash
   esptool.py --chip esp32 --port /dev/ttyUSB0 write_flash --baud 115200 -z 0x1000 -fm dio esp32-20190125-v1.10.bin
   ```

## Acceso a la placa + REPL

A la placa se puede acceder por dos medios:

* Serial
* Web

Una vez se accede a la placa, estamos en el [REPL](https://es.wikipedia.org/wiki/REPL) (Read-Eval-Print-Loop) de esta. A efectos prácticos es un interprete de Python y además cuenta con autocompletado. Para ver todas las opciones con las que cuenta escribimos

```python
help()
```

Veremos todos los comandos y una pequeña ayuda. Los comandos más importantes son:

* `Barra espaciadora` -> Sirve para el autocompletado.
* `Ctrl+C` -> Para cerrar algún script que hayamos abierto dentro de la placa.
* `Ctrl+D` -> Para hacer un reset por software (soft reset).
* `Ctrl+E` -> Modo pegar (de copia-pega).

También podremos usar esta función para ver con que variables/constantes + funciones cuenta cada módulo. Por ejemplo importamos el módulo `esp` y vemos todo lo que tiene

```python
import esp

help(esp)
```

Para ver todos los módulos disponibles en la placa se hace

```python
help('modules')
```

### Comunicación con la placa por serial -> SerialREPL

Para poder entrar dentro de la placa, estas normalmente traen una UART (interfaz serie, como un USB dentro) accesible por los pines TX y RX. Así que con el cable usb y un programa que permita conexión serial podemos acceder a la placa. Programas con serial hay muchos, tanto con interfaz gráfica (GUI) como por terminal:

* Windows
  * [MobaXterm](https://mobaxterm.mobatek.net/)
  * [PuTTY](https://www.putty.org/)
  * [CoolTerm](http://freeware.the-meiers.org/)
* Mac
  * [CoolTerm](http://freeware.the-meiers.org/)
  * [Screen](https://ss64.com/osx/screen.html)
* Linux
  * [PuTTY](https://www.putty.org/)
  * [GTKTerm](http://gtkterm.feige.net/)
  * [GNU screen](https://www.gnu.org/software/screen/)
  * [Picocom](https://github.com/npat-efault/picocom)
  * [CoolTerm](http://freeware.the-meiers.org/)

### Comunicación con la placa por WiFi -> WebREPL

También se puede acceder al REPL de la placa a través de una utilidad web, WebREPL, pero para ello debemos seguir los siguientes pasos:

1. Abrir la utilidad [WebREPL](http://micropython.org/webrepl/) en un navegador web.
2. Acceder a la placa por serial.
3. Configurar la WiFi en modo AP (Punto de Acceso). Se adjunta pequeño script de ayuda

   ```python
    import network
    # Primero activamos el interfaz AP de la placa
    my_wifi = 'nombre-para-la-wifi'
    my_password = 'contraseña-para-la-wifi' # Debe tener al menos 8 caracteres
    ap_lan = network.WLAN(network.AP_IF)
    ap_lan.active(True) # Devuelte True si la interfaz AP está activa
    ap_lan.config(essid=my_wifi, password=my_password)
    # Despues activamos el webrepl
    import webrepl_setup
   ```

4. Después debemos configurar el WebREPL con

   ```python
   import webrepl_setup
   ```

   Nos saldran las instrucciones para activar el WebREPL (activarlo), hay que ponerle una contraseña de entre 4-9 caracteres y por último reiniciarlo.

5. Conectarse a la WiFi de la placa.
6. Ir a la web de WebREPL que está abierta en el navegador y darle al botón ***Connect*** (pedirá el password puesto en el paso 4.).

## Primeros pasos

### Filesystem y sistema de ejecución

Cuando la placa arranca, se ejecuta un fichero interno, `_boot.py`, que monta todo el sistema de ficheros (filesystem). Una vez el sistema está montado, se ejecutan dos ficheros secuencialmente (si existen):

1. `boot.py` -> Equivale al `setup()` de Arduino.
2. `main.py` -> Equivale al `loop()` de Arduino.

### Configurar WiFi

Las placas ESPx cuentan con dos interfaces de red:

* Station Interface -> Es para conectarse a una red WiFi.
* Access Point Interface -> Es para crear una red WiFi propia.

Las dos interfaces pueden funcionar a la vez, es decir, que estar conectada la placa a una red WiFi y a la vez generar su propia red WiFi. Para poder configurarlos necesitamos trabajar con el módulo `network`.

* Conectarse a una red WiFi:

  ```python
  import network

  red = 'nombre-de-la-red-wifi'
  contrasena = 'pass-de-la-wifi'

  sta_if = network.WLAN(network.STA_IF)
  sta_if.active(True)
  sta_if.connect(red, contrasena)
  ```

* Crear una red WiFi:

  ```python
  import network

  red = 'nombre-para-la-wifi'
  contrasena = 'contrasena-para-la-wifi'

  ap_if = network.WLAN(network.AP_IF)
  ap_if.active(True)
  ap_if.config(red, contrasena)
  ```
