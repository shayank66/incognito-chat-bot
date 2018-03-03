var express = require('express');
var router = express.Router();

router.use('/',require('../app/Controllers/MainController'));
router.use('/gateway',require('../app/Controllers/GatewayController'));

module.exports = router;
