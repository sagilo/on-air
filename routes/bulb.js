require('log-timestamp');
var express = require('express');
var updateBulb = require('../bulb');
var buildParams = require('../params');
var router = express.Router();

/* GET bulb. */
router.get('/on', async function(req, res, next) {
  await updateBulb(true);
  req.session.mode = 'running';
  req.session.save();
  var params = buildParams(req, { text: 'Turned bulb on' });
  res.render('control', params);
});

router.get('/off', async function(req, res, next) {
  await updateBulb(false);
  req.session.mode = 'stopped';
  req.session.save();
  var params = buildParams(req, { text: 'Turned bulb off' });
  res.render('control', params);
});

module.exports = router;
