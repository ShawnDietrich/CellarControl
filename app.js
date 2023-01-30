//Dependencies
var Publish = require("./mqtt/publish");
var SensorClass = require("./Sensor/CollectData");
var ChillerControl = require("./models/chillerControl");
var FermenterControl = require("./models/fermenterControl");
var SubscribeClass = require("./mqtt/subscribe");
//var outputs = require("./outputControl/config");
const compressorControl = require("./outputControl/compressorControl");
var fermenterControl = require("./models/fermenterControl");
var chillerControl = require("./models/chillerControl");

//Class instance
var sensor = new SensorClass();
var publish = new Publish();
var subscribe = new SubscribeClass();

//global variables
const interval = 10000;

try {
  //Subscribe to chiller control topic
  console.log("Subscribe to topics");
  //subscribe.ChillerControl();

  //set all outputs off
  console.log("Turning off all outputs");
  //outputs.comp.writeSync(0);
  //outputs.pump.writeSync(0);

  //initial chiller and pump control
  //compressorControl();
} catch (err) {
  console.log(err);
}

//Setup interval to read sensors every 5min
setInterval(() => {
  try {
    //Get List of Temperature Sensors
    console.log("Get sensor list");
    sensor.ListSensors(async (sensorList) => {
      //console.log("Received list" + sensorList.sensor1 + sensorList.sensor2);
      fermenterControl.current.ID = sensorList.sensor1;
      chillerControl.current.ID = sensorList.sensor2;

      //Read Fermenter Temperature
      const ReadFermenterTemp = async () =>{
        fermenterControl.current.temperature = await sensor.ReadTemp(fermenterControl.current.ID)
        console.log(`fermenter temp ${fermenterControl.current.temperature}`)
      } 
      const ReadChillerTemp = async () => {
        chillerControl.current.temperature = await sensor.ReadTemp(chillerControl.current.ID)
        console.log(`chiller temp ${chillerControl.current.temperature}`)
      }

      //call async functions
      await ReadFermenterTemp();
      await ReadChillerTemp();
    });

    //console.log(`Fermenter Temp = ${FermenterControl.current.temperature}`);
    //console.log(`Chiller Temp = ${ChillerControl.current.temperature}`);
    //Publish to MQTT
    //publish.PublishFermenter(FermenterControl);
    //publish.PublishChiller(ChillerControl);
  } catch (err) {
    console.log(err);
    throw err;
  }
}, interval);
