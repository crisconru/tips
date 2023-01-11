# UART

??? tip "API de la librería"

    Un buen recurso para ver la API completa de [HardwareSerial](https://arduwiki.perut.org/index.php/Serial) y [SoftwareSerial](https://arduwiki.perut.org/index.php/SoftwareSerial).

    Aunque Arduino tiene su docu en:
    
    - [HardwareSerial](https://www.arduino.cc/reference/en/language/functions/communication/serial/)
    - [SoftwareSerial](https://docs.arduino.cc/learn/built-in-libraries/software-serial)

    Te recomiendo que te vayas al código directamente, ya que las dos heredan de Stream y ahí puedes ver bien toda la API

    - [HardwareSerial.h](https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/HardwareSerial.h) | [HardwareSerial.cpp](https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/HardwareSerial.cpp)
    - [SoftwareSerial.h](https://github.com/arduino/ArduinoCore-avr/blob/master/libraries/SoftwareSerial/src/SoftwareSerial.h) | [SoftwareSerial.cpp](https://github.com/arduino/ArduinoCore-avr/blob/master/libraries/SoftwareSerial/src/SoftwareSerial.cpp)

En Arduino a la UART se le suele decir como `Serial`. La tenemos de dos tipos:

1. Serial por Hardware: Son unos pines por defecto que dependen de cada placa y puede haber varios.
2. Serial por Software: Son unos pines que eliges tu, pero es más lenta y solo puede haber uno funcionando aunque crees varios.

Las dos heredan de la clase Stream, así que comparten la mayor parte de su API. Para ver la API de Stream ir [aquí](stream.md).

Abajo del todo te dejo unos ejemplos en la sección [Ejemplos](#ejemplos).

## HardwareSerial

El objeto para usar la API es `Serial`. En placas como la Mega hay incluso 4 serial:

1. `Serial`
2. `Serial1`
3. `Serial2`
4. `Serial4`

### Habilitar / deshabilitar la comunicación en Hardware

Para habilitar se usa la función `begin()`, donde se le pasa los baudios,
y opcionalmente luego la configuración (es una constante y por defecto es `SERIAL_8N1`).

Para deshabilitar se usa la función `end()`.

=== "Inicialización"

    ``` cpp
    // Enable with Config 8N1 by default
    Serial.begin(baud);
    // Enable with custom config
    Serial.begin(baud, config);
    // Disable
    Serial.end();
    ```

=== "Velocidad en baudios"

    Es un tipo `long`

    | Baudios | Tiempo por bit (microseg) |
    | :-: | :- |
    | **115200** | 8,681 |
    | 57600 | 17,361 |
    | 38400 | 26,042 |
    | 31250 | 32,000 |
    | 28800 | 34,722 |
    | 19200 | 52,083 |
    | 14400 | 69,444 |
    | **9600** | 104,166 |
    | 4800 | 208,333 |
    | 2400 | 426,666 |
    | 1200 | 833,333 |
    | 600 | 1666,666 |
    | 300 | 3333,333 |

=== "Configuración"

    Es una constante que define Longitud + Paridad + Bits de Parada

    | Configuración | Longitud | Paridad | Bits de parada |
    | :-: | :-: | :-: | :-: | 
    | SERIAL_5N1 | 5 | None | 1 |
    | SERIAL_6N1 | 6 | None | 1 |
    | SERIAL_7N1 | 7 | None | 1 |
    | **SERIAL_8N1** | 8 | None | 1 |
    | SERIAL_5N2 | 5 | None | 2 |
    | SERIAL_6N2 | 6 | None | 2 |
    | SERIAL_7N2 | 7 | None | 2 |
    | SERIAL_8N2 | 8 | None | 2 |
    | SERIAL_5E1 | 5 | Even | 1 |
    | SERIAL_6E1 | 6 | Even | 1 |
    | SERIAL_7E1 | 7 | Even | 1 |
    | SERIAL_8E1 | 8 | Even | 1 |
    | SERIAL_5E2 | 5 | Even | 2 |
    | SERIAL_6E2 | 6 | Even | 2 |
    | SERIAL_7E2 | 7 | Even | 2 |
    | SERIAL_8E2 | 8 | Even | 2 |
    | SERIAL_5O1 | 5 | Odd | 1 |
    | SERIAL_6O1 | 6 | Odd | 1 |
    | SERIAL_7O1 | 7 | Odd | 1 |
    | SERIAL_8O1 | 8 | Odd | 1 |
    | SERIAL_5O2 | 5 | Odd | 2 |
    | SERIAL_6O2 | 6 | Odd | 2 |
    | SERIAL_7O2 | 7 | Odd | 2 |
    | SERIAL_8O2 | 8 | Odd | 2 |

### Saber si la UART está disponible

Para saber si el puerto está disponible se usa

``` cpp
if(!Serial)
```

Una buena estrategia para esperar a que esté disponible sería

``` cpp
void setup() {
  // Initialize serial
  Serial.begin(9600);
  // Wait for port to open
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
}
```

### Leer datos

Para saber si hay datos para leer se usa `Serial.available()` que devuelve el numero de bytes para leer.

Pero hay placas, como la UNO que puede usar la interrupción `serialEvent`.

La MEGA puede usar `serialEvent`, `serialEvent1`, `serialEvent2`, `serialEvent3`.

Otras no lo tienen.

=== "Manualmente"

    ```c
    void loop () {
        if (Serial.available()) {
            // Read data
        }
    }
    ```

=== "Con interrupción"

    ```c
    void loop(){
        //...
    }

    void serialEvent() {
        // Read data
    }
    ```

## SoftwareSerial

La UART por Software tiene unas cuantas diferencias con respecto a la Hardware:

- La comunicación no es "Full Duplex" del todo, es una especie de Half Duplex (mientras emite no puede recibir, y viceversa)
- Es más lenta, porque no es Full Duplex y porque algunas placas no soportan altas velocidades.
- No tienes interrupciones para leer, tienes que leer manualmente (mira los ejemplos).
- Puedes definir más de una por placa, pero solo puedes recibir datos con 1.
    - ¿Y para que quiero varias?
    - Apagas una y usas la otra. Luego apagas la otra, y enciendes la una...

### Habilitar / deshabilitar la comunicación en Software

!!! warning "Comunicación 8N1"

    En la UART por Software solo tienes configuración 8N1.

    Solo puedes configurar la velocidad.

Para habilitar se usa la función `begin()`, donde se le pasa los baudios,
y opcionalmente luego si se quiere usar la lógica invertida (por defecto es `false`).

Para deshabilitar se usa la función `end()`.

=== "Inicialización"

    ``` cpp
    #include <SoftwareSerial.h>

    const uint8_t RX_PIN = A0;
    const uint8_t TX_PIN = A1;


    SoftwareSerial softSerial(RX_PIN, TX_PIN);

    void setup() {
        // Enable with Config 8N1 by default
        softSerial.begin(baud);
        // Enable with custom config
        bool inverseLogic = true;
        softSerial.begin(baud, inverseLogic);
        // Disable
        Serial.end();
    }
    ```

=== "Velocidad en baudios"

    Es un tipo `long`

    | Baudios | Tiempo por bit (microseg) |
    | :-: | :- |
    | **115200** | 8,681 |
    | 57600 | 17,361 |
    | 38400 | 26,042 |
    | 31250 | 32,000 |
    | 28800 | 34,722 |
    | 19200 | 52,083 |
    | 14400 | 69,444 |
    | **9600** | 104,166 |
    | 4800 | 208,333 |
    | 2400 | 426,666 |
    | 1200 | 833,333 |
    | 600 | 1666,666 |
    | 300 | 3333,333 |

### Lectura de datos, buffer de entrada desbordado

El buffer de entrada está limitado a 64 bytes, si quieres saber si se ha desbordado
se usa la función `bool overflow()`. Si se ha desbordado, devuelve `true`, y vuelve el
flag a `false`.

``` cpp
if (softSerial.overflow()) {
    softSerial.println("The SoftSerial has overflow");
}
```

### Usar varias UART a la vez

Si se definen varias UART por Software, la última que habilites con `begin()` es
la que va a leer. Para poder intercambiar entre ellas hay 3 funciones

`bool isListening()` devuelve si la UART está o no leyendo.

`bool listen()` habilita esa UART para que sea la que lea, y devuelve `true` si
no era la UART que estaba leyendo.

`bool stopListening()` deshabilita la lectura de esa UART, y devuelve `true` si
se estaba usando para leer.

Aquí se adjunta un ejemplo con dos SoftwareSerial UARTs, hecho por Tom Igoe 2011~2016 de Arduino.
El código oficial está [aquí](https://docs.arduino.cc/tutorials/communication/TwoPortReceive).
Primero se lee con una y luego con otra. Veras que no usa la función `stopListening()`.

``` cpp
#include <SoftwareSerial.h>

SoftwareSerial portOne(10, 11);

SoftwareSerial portTwo(8, 9);

void setup() {
  Serial.begin(9600);
  while (!Serial) { ; }
  // Start each software serial port
  portOne.begin(9600);
  portTwo.begin(9600);
}

void loop() {
  // Start listen in portOne
  portOne.listen();
  Serial.println("Data from port one:");
  while (portOne.available() > 0) {
    char inByte = portOne.read();
    Serial.write(inByte);
  }
  Serial.println();
  // Now listen on the second port
  portTwo.listen();
  Serial.println("Data from port two:");
  while (portTwo.available() > 0) {
    char inByte = portTwo.read();
    Serial.write(inByte);
  }
  Serial.println();
}
```

## Ejemplos

Ejemplos que reciben algo por el Serial y lo devuelven:

=== "Pasar lo de una UART a la otra"

    ```c
    #include <Arduino.h>
    #include <SoftwareSerial.h>
    
    const char DELIMETER = '\n';
    
    const uint8_t RX_PIN = A0;
    const uint8_t TX_PIN = A1;
    SoftwareSerial SoftSerial = SoftwareSerial(RX, TX);

    void setup() {
        SoftSerial.begin(9600);
        SoftSerial.setTimeout(100);
    }

    void loop() {
        readSoftwareWriteHardware();
        readHardwareWriteSoftware();
    }

    void readSoftwareWriteHardware() {
        if (SoftSerial.available()) {
            String message = SoftSerial.readStringUntil(DELIMETER);
            Serial.println("Received from Software -> " + message);
        }
    }

    void readHardwareWriteSoftware() {
        if (Serial.available()) {
            String message = Serial.readStringUntil(DELIMETER);
            SoftSerial.println("Received from Hardware-> " + message);
        }
    }
    ```

=== "Hardware con interrupción"

    ```c
    #include <Arduino.h>
    
    const char DELIMETER = '\n';

    void setup() {
        Serial.begin(9600);
        Serial.setTimeout(100);
    }

    void loop() {}

    void serialEvent() {
        if (Serial.available()) {
            String message = Serial.readStringUntil(DELIMETER);
            Serial.println("Received -> " + message);
        }
    }
    ```

=== "Hardware sin interrupción"

    ``` cpp
    #include <Arduino.h>
    
    const char DELIMETER = '\n';

    void setup() {
        Serial.begin(9600);
        Serial.setTimeout(100);
    }

    void loop() {
        if (Serial.available()) {
            String message = Serial.readStringUntil(DELIMETER);
            Serial.println("Received -> " + message);
        }
    }
    ```

=== "Software"

    ```c
    #include <Arduino.h>
    #include <SoftwareSerial.h>
    
    const char DELIMETER = '\n';
    
    const uint8_t RX_PIN = A0;
    const uint8_t TX_PIN = A1;
    SoftwareSerial SoftSerial = SoftwareSerial(RX, TX);

    void setup() {
        SoftSerial.begin(9600);
        SoftSerial.setTimeout(100);
    }

    void loop() {
        if (SoftSerial.available()) {
            String message = SoftSerial.readStringUntil(DELIMETER);
            Serial.println("Received -> " + message);
        }
    }
    ```

## Donde usarlo

Por ejemplo con los módulos Bluetooth HC-05 / HC-06 / HM-10.
