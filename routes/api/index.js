var express = require('express');
var router = express.Router();

router.use('/text',require('./text.js'));

module.exports = router;
