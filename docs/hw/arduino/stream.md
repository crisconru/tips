# Stream

La librería Stream es muy importante ya que de ella heredan:

- HardwareSerial y SoftwareSerial
- Wire (I2C)
- SD
- Ethernet

Se tiene un buffer para la entrada de datos y otro para los de salida.

Esta clase a su vez hereda de la clase `Print`, que se usa para la parte de salida.

??? tip "API de la librería"

    Pese a que en el [Reference de Arduino tienes toda la info](https://www.arduino.cc/reference/en/language/functions/communication/stream/),
    te recomiendo que mires el código directamente [Stream.h](https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/Stream.h)
    y [Stream.cpp](https://github.com/arduino/ArduinoCore-avr/blob/master/cores/arduino/Stream.cpp).

## Buffer de entrada

### Comprobar si hay datos para leer

`size_t available()` devuelve el número de bytes en el buffer de entrada.

### Leer un dato

`int read()` devuelve el primer dato del buffer como `int`, o `-1` si no hay nada, y lo elimina del buffer.

`int peek()` igual que el anterior pero sin quitarlo del buffer.

### Leer varios datos

Para poder leer varios datos puedes usar las funciones de antes en un bucle del estilo

``` cpp
if (Stream.available()) {
    while (Stream.available()) {
        char car = (char)Stream.read();
        // ...
    }
}
```

Hay funciones optimizadas para hacer esto más sencillo. Lo primero es definir un
`timeout` en milisegundos.

`setTimeout(unsigned long timeout)`

Todas estas funciones al leer, eliminan esos datos del buffer:

- `size_t readBytes(char *buffer, size_t length)`
    - Los `length` bytes leídos (o menos, debido al `timeout`) los mete en `buffer`.
    - La función devuelve el número de bytes leídos.
- `size_t readBytesUntil(char terminator, char *buffer, size_t length)`
    - Los bytes leídos hasta encontrar el `terminator` (o menos, debido al `timeout` o `length`) los mete en `buffer`.
    - La función devuelve el número de bytes leídos.
- `String readString()`
    - Devuelve todos los bytes en `String` o los que pueda leer dentro del `timeout`.
- `String readStringUntil(char terminator)`
    - Devuelve todos los bytes en `String` hasta encontrar el byte `terminator` o los que pueda leer dentro del `timeout`.
- `long parseInt([LookaheadMode lookahead, char ignore])`
    - Devuelve el primer `long` o `0` si se excede el `timeout`.
    - El `lookahead` define el método a saltar bytes
        - `SKIP_ALL`: Salta todo lo que no sean enteros o signo menos, es el modo por defecto.
        - `SKIP_NONE`: No se salta nada, así que solo lee el primer byte.
        - `SKIP_WHITESPACE`: Solo tabs, espacios, saltos de línea y retorno de carro son saltados.
    - Se puede indicar un char `ignore` para que lo salte.
- `float parseFloat([LookaheadMode lookahead, char ignore])`
    - Devuelve el primer `float` o `0.0` si se  excede el `timeout`.
    - El `lookahead` define el método a saltar bytes
        - `SKIP_ALL`: Salta todo lo que no sean dígitos, puntos decimales o signo menos, es el modo por defecto.
        - `SKIP_NONE`: No se salta nada, así que solo lee el primer byte.
        - `SKIP_WHITESPACE`: Solo tabs, espacios, saltos de línea y retorno de carro son saltados.
    - Se puede indicar un char `ignore` para que lo salte.

### Buscar dato

Todas estas funciones buscan dentro del buffer, pero no eliminan el contenido.
Como las anteriores funciones hay que definirles un `timeout`:

- `bool find(char *target[, size_t length])`
    - Busca hasta encontrar el `target` o salta el `timeout`.
    - El `target` donde buscar es un char o un string.
    - Se puede definir el que busque en los primeros `length` bytes.
- `bool findUntil(char *target, char *terminator)`
    - Busca hasta encontrar el `target` o el `terminator` o salta el `timeout`.
    - El `target` donde buscar es un char.
    - El `terminator` a buscar es un char.

## Buffer de salida

### Comprobar si hay datos por enviar

`size_t availableForWrite()` devuelve el número de bytes pendientes por ser ennviados del buffer de salida.

### Mandar un dato

La función usada es

``` cpp
size_t write(const uint8_t *buffer[, size_t size])
```

Pero la forma de usarla sería más bien

``` cpp
size_t write(uint8_t data)
```

Devuelve el número de bytes enviados.

### Mandar varios datos

Se podrían mandar usando un bucle con el comando anterior, pero lo ideal es usar las funciones.

=== "Mandar datos en crudo"

    La función a usar es

    ``` cpp
    size_t write(const uint8_t *buffer[, size_t size])
    ```

    Se puede definir que se manden `size` bytes. Un par de ejemplos.

    ``` cpp
    Serial.write(65);            // int
    Serial.write("65");          // string
    Serial.write("Hello World"); // string
    ```

=== "Mandar texto"

    La función a usar puede tener tres formas

    ``` cpp
    size_t print(const String &s)
    size_t print(data[, formato])
    size_t print(number[, decimals])
    ```

    Ejemplos

    ``` cpp
    // size_t print(const String &s)
    Serial.print("Hello World");
    // size_t print(data[, formato])
    char c = 'A';          // same than c = 65
    Serial.write(c);       // A
    Serial.print(c);       // A
    Serial.print(c, DEC);  // 65
    Serial.print(c, HEX);  // 41
    Serial.print(c, OCT);  // 101
    Serial.print(c, BIN);  // 01000001
    // size_t print(number[, decimals])
    Serial.println(PI, 2); //3.14
    Serial.println(PI, 6); //3.141593
    ```

=== "Mandar líneas de texto"

    Es igual que la anterior, pero por último envía un retorno de carro + salto de línea

    ``` cpp
    println(<something>) = print(<something>) + print("\r\n")
    ```

También está la función siguiente para esperar a que se
hayan enviado todos los datos del buffer.

``` cpp
flush()
```
