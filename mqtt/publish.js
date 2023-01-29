const options = { retain: true, qos: 1 };
var Client;
//publish to topic on interval
module.exports = class PublishTopics {
  constructor(client) {
    Client = client;
  }

  PublishFermenter(fermenterControl) {
    if (Client.connected) {
      //console.log(`Sending Temp ${temp}`);
      Client.publish(
        "Sensor/Fermenter/Temperature",
        fermenterControl.current.temperature.toString(),
        options
      );
    } else {
      console.log("Client is not connected");
      throw new error("Client Disconnected");
    }
  }

  PublishChiller(chillerControl) {
    if (Client.connected) {
      Client.publish(
        "Sensor/Chiller/Temperature",
        chillerControl.current.temperature.toString(),
        options
      );
    } else {
      console.log("Client is not connected");
      throw new error("Client Disconnected");
    }
  }
};
