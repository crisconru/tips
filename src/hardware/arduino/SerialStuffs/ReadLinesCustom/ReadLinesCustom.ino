// Variables
String inputStringBuffer = "";
// Functions Definitions
String readSerialLine(String &buffer);
// Setup
void setup() {
  Serial.begin(9600);
}
// Loop
void loop() {
  auto line = readSerialLine(inputStringBuffer);
  if (line.length()) {
    Serial.println("Line -> " + line);
  }
}
// Functions Implementations
String readSerialLine(String &buffer) {
  while(Serial.available()) {
    char car = (char)Serial.read();
    if (car == '\n') {
      String msg = buffer;
      buffer = "";
      return msg;
    }
    buffer += car;
  }
  return "";
}
