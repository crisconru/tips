#include <Arduino.h>
#include <SoftwareSerial.h>

const char END = '\n';

const uint8_t RX = A0;
const uint8_t TX = A1;
SoftwareSerial sSerial(RX, TX);
void softSerialEvent();

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sSerial.begin(9600);
  sSerial.setTimeout(100);
}

void loop() {
  // put your main code here, to run repeatedly:
  softSerialEvent();
}

void serialEvent() {
  String msg = Serial.readStringUntil(END);
  Serial.println("HM-10 <- " + msg);
  sSerial.print(msg);
}

void softSerialEvent() {
  if (sSerial.available()) {
    String msg = sSerial.readStringUntil(END);
    Serial.println("HM-10 -> " + msg);
  }
}