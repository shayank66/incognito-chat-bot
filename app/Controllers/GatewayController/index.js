const express = require('express');
const router  = express.Router();

router.post('/',require('./MainController').post);

module.exports = router;