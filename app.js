//MQTT Dependencies
var Publish = require("./mqtt/publish");
var Client = require("./mqtt/client");
//var SubscribeClass = require("./mqtt/subscribe");
var Outputs = require("./outputControl/outputControl");

//const compressorControl = require("./outputControl/compressorControl");
//Temperature sensor dependency
const tempSensor = require("ds18b20-raspi");
var sensorTypes = require("./models/device");

//Class instance
var publish = new Publish(Client);
var outputs = new Outputs();
//var subscribe = new SubscribeClass();
//var sensors = new sensorClass();

//global variables
const interval = 10000;

try {
  console.log("Get Sensor List");
  var sensorList = tempSensor.list();
  console.log(`sensor list = ${sensorList}`);
  sensorTypes.Fermenter.ID = sensorList[0];
  sensorTypes.Chiller.ID = sensorList[1];

  //Subscribe to chiller control topic
  console.log("Subscribe to topics");
  //subscribe.ChillerControl();

  //setupt output control intervals
  outputs.ChillerControl();
  outputs.FermenterControl();

} catch (err) {
  console.log(err);
}

//Setup interval to read sensors and publish to broker every 5min
setInterval(() => {
  try {
    //Read Fermenter Temperature
    sensorTypes.Fermenter.current.temp = tempSensor.readC(
      sensorTypes.Fermenter.ID,
      2
    );
    sensorTypes.Chiller.current.temp = tempSensor.readC(
      sensorTypes.Chiller.ID,
      2
    );

    console.log(`Fermenter Temp = ${sensorTypes.Fermenter.current.temp}`);
    console.log(`Chiller Temp = ${sensorTypes.Chiller.current.temp}`);

    //Publish to MQTT
    publish.PublishTemperatures(sensorTypes);
  } catch (err) {
    console.log(err);
    throw err;
  }
}, interval);
