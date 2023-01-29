var Client;

module.exports = class SubscribeTopics {
    constructor(client){
        Client = client;
    }

    //Topic Subscription
    ChillerControl = () => {
        Client.on("message", async(topic, message, payload)=> {
            
        });

        Client.on("Chiller/Setpoint/Temperature", {qos:1}, () => {console.log("Topic subscribed")})
    }

    
}