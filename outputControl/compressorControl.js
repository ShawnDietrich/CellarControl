
var outputs = require('./config');
var chiller = require('../models/chillerControl');
module.exports = () => {

    const interval = 10000;
    setInterval(() => {
       if(chiller.Current.temperature > chiller.Current.setpoint){
        outputs.comp.writeSync(1);
        chiller.Current.compessorState = true;
       } else if (chiller.Current.temperature < chiller.Current.setpoint) {
        outputs.comp.writeSync(0);
        chiller.Current.compessorState = false;
       };
    }, interval);
}