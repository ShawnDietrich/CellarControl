const options = { retain: true, qos: 1 };
var client;
//publish to topic on interval
module.exports = class PublishTopics {
    PublishTopics(Client){
        client = Client;
    }

    PublishTemperature(client, temp) {
            if (client.connected) {
                console.log(`Sending Temp ${temp}`);
                client.publish("FermenterTemp", temp.toString(), options);
            } else {
                console.log("Client is not connected");
                throw new error("Client Disconnected");
            }
       
    }
}