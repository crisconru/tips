module.exports =  {
  hostname : process.env.HOSTNAME = require("os").hostname(),
  mqttLocal: process.env.MQTTLOCAL = "192.168.1.50",
  mqttPublic: process.env.MQTTPUBLIC = "broker.hivemq.com",
  Lat: process.env.LAT = "-25.442414",
  Lon: process.env.LON = "-49.236903" ,
  friend: process.env.FRIEND = "vercingetorix"
}