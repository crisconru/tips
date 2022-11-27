#include <Arduino.h>
// Variables
const char DELIMITER = '\n';
String inputStringBuffer = "";
// Setup
void setup() {
  Serial.begin(9600);
}
// Loop
void loop() {}

void serialEvent() {
  inputStringBuffer = Serial.readStringUntil(DELIMITER);
  if (inputStringBuffer.length()) {
    Serial.println("Received -> " + inputStringBuffer);
    inputStringBuffer = "";
  }
}
