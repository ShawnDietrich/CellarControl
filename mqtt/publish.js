const options = { retain: true, qos: 1 };
var Client;
//publish to topic on interval
module.exports = class PublishTopics {
  constructor(client) {
    Client = client;
  }

  PublishTemperatures(Sensors) {
    if (Client.connected) {
      //console.log(`Sending Temp ${temp}`);
      Client.publish(
        "Sensor/Fermenter/Temperature",
        Sensors.Fermenter.current.temp.toString(),
        options
      );

      Client.publish(
        "Sensor/Chiller/Temperature",
        Sensors.Chiller.current.temp.toString(),
        options,
      );

    } else {
      console.log("Client is not connected");
      throw new error("Client Disconnected");
    }
  }
};
