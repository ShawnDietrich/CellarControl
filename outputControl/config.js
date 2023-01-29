const gpio = require('../onoff').gpio;

//object of outputs
var outputs = {
    comp: new gpio(10, 'out'),
    pump: new gpio(11, 'out'),
}

module.exports = outputs;