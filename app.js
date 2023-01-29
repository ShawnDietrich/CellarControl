//Dependencies
var Publish = require("./mqtt/publish");
var SensorClass = require("./Sensor/CollectData");
var ChillerControl = require('./models/chillerControl');
var FermenterControl = require('./models/fermenterControl');
var SubscribeClass = require('./mqtt/subscribe');
var outputs = require("./outputControl/config");
const compressorControl = require("./outputControl/compressorControl");

//Class instance
var sensor = new SensorClass();
var publish = new Publish();
var subscribe = new SubscribeClass();

//global variables
const interval = 10000;

//Get List of Temperature Sensors
var sensorList = sensor.ListSensors();

//Subscribe to chiller control topic
subscribe.ChillerControl();

//set all outputs off 
outputs.comp.writeSync(0);
outputs.pump.writeSync(0);

//initial chiller and pump control
compressorControl();

//Setup interval to read sensors every 5min
setInterval(() => {
  try {
    //Read Temperature
    FermenterControl.current.temperature = sensor.ReadTemp(sensorList(0));
    ChillerControl.current.temperature = sensor.ReadTemp(sensorList(1));

    //Publish to MQTT
    publish.PublishFermenter(FermenterControl);
    publish.PublishChiller(ChillerControl);

  } catch (err) {
    console.log(err);
    throw err;
  }
}, interval);
