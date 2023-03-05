// Variables
String inputStringBuffer = "";
// Setup
void setup() {
  Serial.begin(9600);
}
// Loop
void loop() {}
// Functions Implementations
void serialEvent() {
  if(Serial.available()) {
    inputStringBuffer = Serial.readStringUntil('\n');
    if(inputStringBuffer.length()) {
      Serial.println("Received -> " + inputStringBuffer);
      inputStringBuffer = "";
    }
  }
}
