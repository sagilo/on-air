require('log-timestamp');
var express = require('express');
var updateBulb = require('../bulb');
var router = express.Router();

/* GET bulb. */
router.get('/on', async function(req, res, next) {
  await updateBulb(true);
  res.render('control', { text: 'Turned bulb on' });
});

router.get('/off', async function(req, res, next) {
  await updateBulb(false);
  res.render('control', { text: 'Turned bulb off' });
});

module.exports = router;
