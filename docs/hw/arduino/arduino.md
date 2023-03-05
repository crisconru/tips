# Arduino

Todo lo que voy a poner aquí es pura opinión personal.

???+ tip "tldr - Mi recomendación"

    - Placas ESP32 o incluso la Raspi Pico W.
    - ESPHome con el framework Arduino para progamar esas placas.
    - Si necesitas cosillas puntuales a más bajo nivel, usa Platformio con Arduino framework.
    - El Arduino IDE solo es interesante tenerlo instalado por el Monitor Serial, nada más.

???+ note "Documentación"

    Arduino tiene toda la docu en su [Reference](https://www.arduino.cc/reference/en/) pero también tienen una sección con ejemplillos en el [Learn](https://docs.arduino.cc/learn/).

    A mi me ha gustado mucho [esta página](https://arduwiki.perut.org/index.php/P%C3%A1gina_principal).

Lo que realmente merece la pena de Arduino es la parte del Software, es decir, el framework (creado por Hernando Barragán) y sus librerías (la comunidad).

No recomendaría el IDE de Arduino, para eso recomiendo Platformio en VSCode.

No recomendaría sus placas, no por malas, sino porque merece mucho más la pena los ESP32.

El problema con Arduino, es que como todos, tiene sus luces y sus sombras:

- No hay que olvidar la historia de [Hernando Barragán](https://arduinohistory.github.io/)
    - Básicamente Arduino se apropiaron de manera muy fea de Wiring, que es lo que era Arduino.
    - Lo que realmente vale son esas librerias, y no tanto el Hardware.
- Pese a esto, hay que decir que la gente de Arduino llevó este proyecto a buen puerto y a lo mejor Hernando no lo habría conseguido.
- Sea como sea, sin Arduino no estaríamos muchos hoy en día, y gracias a ellos, y a la comunidad, tenemos un campo de conocimiento maravilloso.
- Pero ignoraron muchos aspectos en el pasado, y se han quedado anquilosados pese a las innovaciones que sacan:
    - Se centraron solo en la parte educativa e ignoraron la parte industrial.
        - El ejemplo de buen hacer es Raspberry Pi, que la parte industrial que genera mucha pasta, es la que sustenta la educativa.
    - El tooling ha estado descuidado tela de años
        - El IDE no era una opción seria, sin autocompletado.
        - No había un CLI friendly durante muchos años.
    - En su día recuerdo que despreciaron MicroPython, y ahora lo están empezando a integrar.
- Básicamente la gente de Espressif les ha pasado de calle.
    - Las placas son más baratas y más potentes.
    - Todas traen de serie WiFi, Bluetooth, etc.
    - Se pueden programar por OTA.
    - No paran de innovar.
- Que si, que Espressif no serán tan éticos como ellos, pero sus comienzos no son tan éticos tampoco.
    - "*Quien a hierro mata a hierro muere*" que dicen en mi tierra, o "*De esos barros, estos lodos*".

Sea como sea, gracias por todo a Arduino.
