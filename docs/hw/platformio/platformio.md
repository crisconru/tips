# Platformio

TODO

Crear código para hardware embebido no es sumamente complicado. El problema mayor que hay es programar / cargar el programa en los chips:

* Necesitas ciertas configuraciones para cada chip.
* Unas herramientas que por lo general son de cada fabricante, cerradas, y que suelen dejar bastante que desear.
* Depende también de la placa que use el chip.
* Etc

[Platformio](https://platformio.org/) es un ecosistema Open Source, multiplataforma, pensado para evitar todo esto. Con él podremos programar desde un Arduino, a un ARM, o alguna de las muchísimas placas que soporta. Lo único que necesita para funcionar es tener instalado Python 3 en el ordenador.

Documentación Oficial de Platformio -> [aquí](https://docs.platformio.org/en/latest/what-is-platformio.html)

## Instalación

Platformio tiene varias herramientas, pero para nosotros, las podemos dividir en dos:

* Platformio Core (CLI)
    * Es el núcleo de todo.
    * Con esto gestionamos y cargamos nuestro código en los chips.
    * Tiene una herramienta de comandos (CLI) muy útil.
* Platformio IDE
    * Es una extensión / plugin que se le pone a entornos gráficos para poder usar Platformio Core de manera más sencilla.
    * El IDE "por defecto" donde usarlo es Visual Studio Code.

Documentación oficial para su instalación -> [aquí](https://docs.platformio.org/en/latest/installation.html)

> Nota:  
> Si usas Linux, debes instalar las [99-platformio-udev.rules](https://docs.platformio.org/en/latest/faq.html#faq-udev-rules) para que vaya mejor la detección de placas.  
> A partir de ahora nos referiremos a Platformio también como PIO, para abreviar.

Si solo vamos a usar PIO Core, desde Python 2.7 hacemos

```bash
pip install platformio
```

Si quisieramos el PIO Ide, buscamos la extensión ***Platformio IDE*** en las extensiones de VSCode e instalará tanto el IDE como el Core.

## Estructura proyecto

Cuando creamos un proyecto, podemos hacerlo por el IDE o con el CLI a través de

```bash
platformio init
```

Se puede usar `pio` en lugar de `platformio`

```bash
pio init
```

Una vez tenemos el proyecto generado, tiene la siguiente estructura:

* **.pioenvs** -> Directorio que **no se debe de tocar** donde PIO guarda los ***build***.
* **include** -> Directorio donde van los headers (`.h`, `.hpp`) del código (si los hubiera).
* **lib** -> Directorio donde van las librerías privadas del proyecto (si las hubiera).
* **src** -> Directorio donde va o van los source (`.c`, `.cpp`) del código.
* **.gitignore** -> Fichero .gitignore con la plantilla de PIO.
* **.travis.yml** -> Fichero para CI (Integración Continua), es para usuarios avanzados.
* **platformio.ini** -> Fichero INI donde va la configuración del proyecto.

### Ejemplo Blink

Si hicieramos el típico blink de Arduino, tendríamos que hacer en el IDE:

* Elegir nombre del proyecto
* Seleccionar la placa (Arduino UNO R3)
* Seleccionar el framework (Arduino)

Desde el CLI haríamos

```bash
pio init --board uno
```

El fichero `platformio.ini` tiene

```ini
[env:uno]
platform = atmelavr
board = uno
framework = arduino
```

Solo debemos crear un fichero `main.cpp` dntro de `src`, con el código

```cpp
#include "Arduino.h"

// Set LED_BUILTIN if it is not defined by Arduino framework
// #define LED_BUILTIN 13

void setup()
{
  // initialize LED digital pin as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  // turn the LED on (HIGH is the voltage level)
  digitalWrite(LED_BUILTIN, HIGH);
  // wait for a second
  delay(1000);
  // turn the LED off by making the voltage LOW
  digitalWrite(LED_BUILTIN, LOW);
   // wait for a second
  delay(1000);
}
```

Primero lo compilamos para ver si tiene algún error:

* IDE -> Con el botón de `PlatformIO: Build`
* CLI -> Con el comando `pio run`

Conectamos la placa y le subimos el programa con:

* IDE -> Con el botón `PlatformIO: Upload`
* CLI -> Con el comando `pio run -t upload`

## platformio.ini

TODO:
