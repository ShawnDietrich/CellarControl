var express = require('express');
var router = express.Router();

var jsonResponse = {
    name: "test Data", 
    FermenterTemp: 23,
    chillerTemp: 3,
    status: "off"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(jsonResponse);
});

router.post('/airlock', (req, res, next) => {
    
    console.log(`Message Received ${JSON.stringify(req.body)}`)
    
    res.sendStatus(200);

})

module.exports = router;