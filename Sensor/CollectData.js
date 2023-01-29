var sensor = require("ds18b20-raspi");



module.exports = class TimedCollect {

    //Find Sensors
    ListSensors(){
        sensor.list((err, deviceIds) => {
            if(error){
                console.log(error);
                throw new error;
            }else{
                return deviceIds
            }
        })
    }

    //Read temp sensor value -- simulate with random number
    ReadTemp(deviceID) {
        sensor.readC(deviceID, 2, (err, temp)=> {
            if(error){
                console.log(error);
                throw new error;
            }else{
                return temp;
            }
        })
    }
}