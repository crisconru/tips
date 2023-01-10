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

Las dos heredan de la clase Stream, así que comparten la mayor parte de su API. Para ver la API de Stream ir [aquí](stream.md)

## HardwareSerial

El objeto para usar la API es `Serial`. En placas como la Mega hay incluso 4 serial:

1. `Serial`
2. `Serial1`
3. `Serial2`
4. `Serial4`

### Habilitar / deshabilitar la comunicación

=== "Inicialización"

    ``` c
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

### Leer datos

Para saber si hay datos para leer se puede usar `Serial.available()` que devuelve el numero de bytes para leer, o usar la interrupción `serialEvent`.

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

### Escribir datos

Para mandar datos se puede hacer:

1. byte a byte
2. 

## SoftwareSerial

...
## Ejemplos

Ejemplos que reciben algo por el Serial y lo devuelven:

=== "Serial Hardware con interrupción"

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

=== "Serial Hardware sin interrupción"

    ``` c
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

=== "Serial Software"

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
            String message = SoftSerialfiles.readStringUntil(DELIMETER);
            Serial.println("Received -> " + message);
        }
    }
    ```

## Donde usarlo

Por ejemplo con los módulos Bluetooth HC-05 / HC-06 / HM-10.
