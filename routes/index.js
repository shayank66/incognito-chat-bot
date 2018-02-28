var express = require('express');
var router = express.Router();

router.use('/',require('../app/Controllers/MainController'));

module.exports = router;
