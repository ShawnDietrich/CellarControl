
    Fermenter = {
        ID: 0,
        expected: {
            setpoint: 0,
            pumpState: false,
        },
        current: {
            setpoint: 0,
            temp: 0,
            pumpState: false,
        }
    };

   Chiller = {
        ID: 0,
        expected: {
            setpoint: 0,
            compState: false,
        },
        current: {
            setpoint: 0,
            temp: 0,
            compState: false,
        }
    };
    
module.exports = {Fermenter, Chiller}