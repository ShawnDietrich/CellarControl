



module.exports = class TimedCollect {

    //Read temp sensor value -- simulate with random number
    FermenterTemp() {
        return Math.floor((Math.random() * 30) + 20);
    }

    ChillerTemp() {
        return Math.floor((Math.random() * 10) + 1);
    }
}