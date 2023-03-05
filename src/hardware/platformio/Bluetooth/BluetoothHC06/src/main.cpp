#include <Arduino.h>
#include <SoftwareSerial.h>
const char START = '*';
const char END = '\n';
/* AT Commands HC-06 -> Default 9600 8N1, Name HC-06, Pin 1234
NUMBER CONTENT AT_COMMAND  RESPONSE      EXPLANATION                                    DEFAULT
a              AT          OK            Used to verify communication
b              AT+VERSION  OKlinvorV1.8  The firmware version
c      xyx     AT+NAMExyz  OKsetname     Sets the module name to “xyz” (20 char limit)  HC-06
d      1234    AT+PINxxxx  OKsetPIN      Sets the module PIN to xxxx (4-bits number)    1234
e              AT+BAUD1    OK1200        Sets the baud rate to    1200
f              AT+BAUD2    OK2400        Sets the baud rate to    2400
g              AT+BAUD3    OK4800        Sets the baud rate to    4800
h              AT+BAUD4    OK9600        Sets the baud rate to    9600                  This
i              AT+BAUD5    OK19200       Sets the baud rate to   19200
j              AT+BAUD6    OK38400       Sets the baud rate to   38400
k              AT+BAUD7    OK57600       Sets the baud rate to   57600
l              AT+BAUD8    OK115200      Sets the baud rate to  115200
m              AT+BAUD9    OK230400      Sets the baud rate to  230400
n              AT+BAUDA    OK460800      Sets the baud rate to  460800
o              AT+BAUDB    OK921600      Sets the baud rate to  921600
p              AT+BAUDC    OK1382400     Sets the baud rate to 1382400
q              AT+LED0                   Turn off the blue LED
r              AT+LED1                   Turn on  the blue LED
s              AT+PN       OK NONE       Sets no parity                                This
t              AT+PE       OK EVEN       Sets even parity
v              AT+PO       OK ODD        Sets odd parity
*/
const String AT_COMMANDS[] = {
  "AT",
  "AT+VERSION",
  "AT+NAME",
  "AT+PIN",
  "AT+BAUD1",
  "AT+BAUD2",
  "AT+BAUD3",
  "AT+BAUD4",
  "AT+BAUD5",
  "AT+BAUD6",
  "AT+BAUD7",
  "AT+BAUD8",
  "AT+BAUD9",
  "AT+BAUDA",
  "AT+BAUDB",
  "AT+BAUDC",
  "AT+LED0",
  "AT+LED1",
  "AT+PN",
  "AT+PE",
  "AT+PO"
};

const uint8_t RX = A0;
const uint8_t TX = A1;
SoftwareSerial bt = SoftwareSerial(RX, TX);

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(1000);
  // BT
  bt.begin(9600);
  bt.setTimeout(100);
}

void loop() {
  if (bt.available()) {
    String msg = bt.readStringUntil(END);
    if (msg.length()) {
      Serial.println("RX HC06 -> " + msg);
      Serial.readBytesUntil()
    }
  }
}

void serialEvent() {
  String msg = Serial.readStringUntil(END);
  Serial.println("RX Serial -> " + msg);
  const int index = msg.indexOf(START);
  if (index == -1) {
    Serial.println("Invalid message " + msg);
    return;
  }
  const char command = msg.charAt(index + 1);
  if ('a' <= command && command <= 'v') {
    const int atIndex = command - 'a';
    const String atContent = (command == 'c' || command == 'd') ? msg.substring(index + 2) : "";
    const String btMessage = AT_COMMANDS[atIndex] + atContent;
    Serial.println("TX HC06 -> " + btMessage);
    bt.print(btMessage);
    return;
  }
  Serial.println("Invalid command " + command);
}
