var sensor = require("ds18b20-raspi");
const chillerControl = require("../models/chillerControl");
const fermenterControl = require("../models/fermenterControl");



module.exports = class TimedCollect {

    //Find Sensors
   async ListSensors(){
       await sensor.list((err, deviceIds) => {
            if(err){
                console.log(error);
                throw new error;
            }else{
                //Returns an array of sensors detected
                let sensors = {
                    sensor1: deviceIds[0],
                    sensor2: deviceIds[1],
                };
                //console.log(`Reading sensors ID's ${sensors.sensor1} , ${sensors.sensor2}`)
                return sensors;
            }
        })
    }

    //Read temp sensor value -- simulate with random number
   async ReadTemp(deviceID) {
       await sensor.readC(deviceID, 2, (err, temp)=> {
            if(error){
                console.log(error);
                throw new error;
            }else{
                return temp;
            }
        })
    }
}