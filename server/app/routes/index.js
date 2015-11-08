'use strict';
var router = require('express').Router();

router.use('/game', require('./game'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
module.exports = router;
