var outputs = require("./config");
var device = require("../models/device");
var config; 
module.exports = class {
  constructor(){
    //Set all outputs to off
    outputs.comp.writeSync(0);
    outputs.pump.writeSync(1);
  }

  ChillerControl() {
    const interval = 10000;
    setInterval(() => {
      if (device.Chiller.current.temp > device.Chiller.current.setpoint) {
        outputs.comp.writeSync(1);
        device.Chiller.current.compState = true;
      } else if (device.Chiller.current.temp < device.Chiller.current.temp) {
        outputs.comp.writeSync(0);
        device.Chiller.current.compState = false;
      }
    }, interval);
  }

  FermenterControl() {
    const interval = 100000;
    setInterval(() => {
      if (device.Fermenter.current.temp > device.Fermenter.current.setpoint) {
        outputs.pump.writeSync(1);
        device.Fermenter.current.pumpState = true;
      } else if (
        device.Fermenter.current.temp < device.Fermenter.current.setpoint
      ) {
        outputs.pump.writeSync(0);
        device.Fermenter.current.pumpState = false;
      }
    }, interval);
  }
};
