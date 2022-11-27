// Functions Definitions
String readSerialLine();
// Setup
void setup() {
  Serial.begin(9600);
}
// Loop
void loop() {
  String msg = readSerialLine();
  if (msg.length()) {
    Serial.println("Line -> " + msg);
  }
}
// Functions Implementations
String readSerialLine() {
  if (Serial.available()) {
    return Serial.readStringUntil('\n');
  }
  return "";
}
