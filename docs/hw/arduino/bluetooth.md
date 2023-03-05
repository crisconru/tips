# Bluetooth

## Configuración a través de comandos AT

!!! danger "OJO"

    Al mandar comandos AT en el HC-05 todos tienen que acabar con `\r\n`

    Por ejemplo, en un HC-06 o un HM-10 se envía `AT`

    En el HC-05 hay que mandar `AT\r\n`

=== "HC-06"

    Valores por defecto:

    - Nombre: HC-06
    - PIN: 1234
    - UART: 9600,8N1

    | Comando                                                      | AT         | Respuesta    |
    | :----------------------------------------------------------- | :--------: | :----------- |
    | Verificar comunicación                                       | AT         | OK           |
    | Obtener versión firmware                                     | AT+VERSION | OKlinvorV1.8 |
    | Poner nombre "xyz" al Bluetooth<br>"xyz" = 20 caracteres max | AT+NAMExyz | OKsetname    |
    | Fijar PIN a xxxx<br>xxxx = número de 4 bits                  | AT+PINxxxx | OKsetPIN     |
    | Fijar baudios a 1200                                         | AT+BAUD1   | OK1200       |
    | Fijar baudios a 2400                                         | AT+BAUD2   | OK2400       |
    | Fijar baudios a 4800                                         | AT+BAUD3   | OK4800       |
    | Fijar baudios a 9600                                         | AT+BAUD4   | OK9600       |
    | Fijar baudios a 19200                                        | AT+BAUD5   | OK19200      |
    | Fijar baudios a 38400                                        | AT+BAUD6   | OK38400      |
    | Fijar baudios a 57600                                        | AT+BAUD7   | OK57600      |
    | Fijar baudios a 115200                                       | AT+BAUD8   | OK115200     |
    | Fijar baudios a 230400                                       | AT+BAUD9   | OK230400     |
    | Fijar baudios a 460800                                       | AT+BAUDA   | OK460800     |
    | Fijar baudios a 921600                                       | AT+BAUDB   | OK921600     |
    | Fijar baudios a 1382400                                      | AT+BAUDC   | OK1382400    |
    | Fijar No Paridad                                             | AT+PN      | OK NONE      |
    | Fijar Paridad Par                                            | AT+PE      | OK EVEN      |
    | Fijar Paridad Impar                                          | AT+PO      | OK ODD       |

=== "HC-05"

    - Nombre: HC-05
    - PIN: 1234
    - UART: 38400,8N1
    - Modo: Slave

    | Comando                                                      | AT         | Respuesta    |
    | :----------------------------------------------------------- | :--------: | :----------- |
    | Verificar comunicación                                       | AT         | OK           |
    | Resetear                                                     | AT+RESET   | OK           |
    | Obtener versión firmware                                     | AT+VERSION | OKlinvorV1.8 |
    | Poner nombre "xyz" al Bluetooth<br>"xyz" = 20 caracteres max | AT+NAMExyz | OKsetname    |
    | Fijar PIN a xxxx<br>xxxx = número de 4 bits                  | AT+PINxxxx | OKsetPIN     |
    | Fijar baudios a 1200                                         | AT+BAUD1   | OK1200       |
    | Fijar baudios a 2400                                         | AT+BAUD2   | OK2400       |
    | Fijar baudios a 4800                                         | AT+BAUD3   | OK4800       |
    | Fijar baudios a 9600                                         | AT+BAUD4   | OK9600       |
    | Fijar baudios a 19200                                        | AT+BAUD5   | OK19200      |
    | Fijar baudios a 38400                                        | AT+BAUD6   | OK38400      |
    | Fijar baudios a 57600                                        | AT+BAUD7   | OK57600      |
    | Fijar baudios a 115200                                       | AT+BAUD8   | OK115200     |
    | Fijar baudios a 230400                                       | AT+BAUD9   | OK230400     |
    | Fijar baudios a 460800                                       | AT+BAUDA   | OK460800     |
    | Fijar baudios a 921600                                       | AT+BAUDB   | OK921600     |
    | Fijar baudios a 1382400                                      | AT+BAUDC   | OK1382400    |
    | Fijar No Paridad                                             | AT+PN      | OK NONE      |
    | Fijar Paridad Par                                            | AT+PE      | OK EVEN      |
    | Fijar Paridad Impar                                          | AT+PO      | OK ODD       |

=== "HM-10"

    Valores por defecto:

    - Nombre: HMSoft
    - PIN: 000000
    - UART: 9600,8N1

    | Comando                                                      | AT         | Respuesta    |
    | :----------------------------------------------------------- | :--------: | :----------- |
    | Verificar comunicación                                       | AT         | OK<br>OK+LOST |
    | Obtener versión firmware                                     | AT+VERSION | OKlinvorV1.8 |
    | Poner nombre "xyz" al Bluetooth<br>"xyz" = 20 caracteres max | AT+NAMExyz | OKsetname    |
    | Fijar PIN a xxxx<br>xxxx = número de 4 bits                  | AT+PINxxxx | OKsetPIN     |
    | Fijar baudios a 1200                                         | AT+BAUD1   | OK1200       |
    | Fijar baudios a 2400                                         | AT+BAUD2   | OK2400       |
    | Fijar baudios a 4800                                         | AT+BAUD3   | OK4800       |
    | Fijar baudios a 9600                                         | AT+BAUD4   | OK9600       |
    | Fijar baudios a 19200                                        | AT+BAUD5   | OK19200      |
    | Fijar baudios a 38400                                        | AT+BAUD6   | OK38400      |
    | Fijar baudios a 57600                                        | AT+BAUD7   | OK57600      |
    | Fijar baudios a 115200                                       | AT+BAUD8   | OK115200     |
    | Fijar baudios a 230400                                       | AT+BAUD9   | OK230400     |
    | Fijar baudios a 460800                                       | AT+BAUDA   | OK460800     |
    | Fijar baudios a 921600                                       | AT+BAUDB   | OK921600     |
    | Fijar baudios a 1382400                                      | AT+BAUDC   | OK1382400    |
    | Fijar No Paridad                                             | AT+PN      | OK NONE      |
    | Fijar Paridad Par                                            | AT+PE      | OK EVEN      |
    | Fijar Paridad Impar                                          | AT+PO      | OK ODD       |
