//Dependencies
var Client = require("./mqtt/index");
var Publish = require("./mqtt/publish");
var SensorClass = require("./Sensor/CollectData");

//Class instance
var sensor = new SensorClass();
var publish = new Publish();

//global variables
const interval = 10000;

//Get List of Temperature Sensors
var sensorList = sensor.ListSensors();

//Setup interval to read sensors every 5min
setInterval(() => {
  try {
    //Read Temperature
    var fermentTemp = sensor.ReadTemp(sensorList(0));
    var mashTemp = sensor.ReadTemp(sensorList(1));

    //Publish to MQTT
    publish.PublishFermenter(Client, fermentTemp);
    publish.PublishMash(Client, mashTemp);

  } catch (err) {
    console.log(err);
    throw err;
  }
}, interval);
