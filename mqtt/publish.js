var sensorValClass = require('../Sensor/CollectData');
var senVal = new sensorValClass();
const options = { retain: true, qos: 1 };

//publish to topic on interval
module.exports = class PublishTopics {

    PublishTemperature(Client) {
        const interval = 300000;
        setInterval(() => {
            if (Client.connected) {
                var temp = senVal.FermenterTemp();
                console.log(`Sending Temp ${temp}`)
                Client.publish("FermenterTemp", temp.toString(), options)
            } else {
                console.log("Client is not connected");
            }
        }, interval);
    }
}