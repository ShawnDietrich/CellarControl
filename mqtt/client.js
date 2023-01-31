var mqtt = require('mqtt');




const url = 'mqtt://192.168.4.51';
const connectOptions = {
    clientId: "mattjs01",
    clean: true,
}

    //Connect Client
    var client = mqtt.connect(url)

    //Connect event listiner
    client.on("connect", () => {
        console.log("Broker Connected")
    });

    

    //connection error handler
    client.on('error', (error) => { console.log(`Connection Failed ${error}`) })

    module.exports = client


