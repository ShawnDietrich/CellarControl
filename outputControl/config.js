const Gpio = require('onoff').Gpio

//object of outputs
var outputs = {
    comp: new Gpio(10, 'out'),
    pump: new Gpio(11, 'out'),
}

module.exports = outputs;