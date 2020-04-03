require('log-timestamp');
var express = require('express');
var execute = require('../checkAndOperateBulb');
var router = express.Router();

const INTERVAL = 1000 * process.env.INTERVAL_SECONDS;

/* GET control. */
router.get('/on', function(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log(`Not authenticated. Redirecting to root`);
    res.redirect('/');
    return;
  }
  
  if (typeof req.session.running == 'undefined') {
    req.session.running = false;
    req.session.save();
  }

  if (req.session.running) {
    console.log(`Already running`);
    res.redirect('/');
    return;
  }

  console.log(`Turning on timer`);
  req.session.running = true;
  req.session.save();
  setTimeout(runner, INTERVAL, req);

  res.redirect('/');
});

function runner(req) {
  if (!req.session.running) {
    console.log(`running was cancelled, not setting new timer`);
    return;
  }

  execute(req);

  console.log(`Setting new runner to run in ${INTERVAL/1000} seconds`);
  setTimeout(runner, INTERVAL, req);
}

router.get('/off', function(req, res, next) {
  req.session.running = false;
  if (!req.isAuthenticated()) {
    console.log(`Not authenticated. Redirecting to root`);
  }
  res.redirect('/');
});

module.exports = router;