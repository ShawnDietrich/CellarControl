const chillerControl = require("../models/device");

var Client;

module.exports = class SubscribeTopics {
  constructor(client) {
    Client = client;
  }

  //Topic Subscription
  ChillerControl(){
    
    Client.on("message", async (topic, message, payload) => {
      
        switch (topic) {
        case "chiller/temperature/setpoint":
          console.log(`Changing Setpoint ${payload}`);
          chillerControl.expected.setpoint = payload;
          break;
        case "chiller/compressor/state":
            console.log("Force on compressor");
            chillerControl.expected.compressorState = true;
            break;
        default:
          break;
      }
    });

    Client.on("Chiller/Setpoint/Temperature", { qos: 1 }, () => {
      console.log("Setpoint Topic subscribed");
    });
    Client.on("chiller/compressor/state", {qos: 1}, () =>{
        console.log("Compressor state Topic subscribed")
    })
  };
};
