
var outputs = require('./config');
var fermenter = require('../models/fermenterControl');

module.exports = () => {
    const interval = 10000;
    setInterval(() => {
       if(fermenter.Current.temperature > fermenter.Current.setpoint){
        outputs.pump.writeSync(1);
        fermenter.Current.compessorState = true;
       } else if (fermenter.Current.temperature < fermenter.Current.setpoint) {
        outputs.pump.writeSync(0);
        fermenter.Current.compessorState = false;
       };
    }, interval);
}