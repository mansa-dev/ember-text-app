var express = require('express');
var router = express.Router();

router.use('/texts',require('./text.js'));

module.exports = router;
