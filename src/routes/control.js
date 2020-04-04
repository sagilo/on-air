require('log-timestamp');
var express = require('express');
var runner = require('../runner');
var router = express.Router();

const INTERVAL = 1000 * process.env.INTERVAL_SECONDS;

var running = false;

/* GET control. */
router.get('/on', function(req, res, next) {
  if (!req.isAuthenticated()) {
    console.log(`Not authenticated. Redirecting to root`);
    res.redirect('/');
    return;
  }
  
  if (running) {
    console.log(`Already running`);
    res.redirect('/');
    return;
  }

  console.log(`Starting service & timer`);

  running = true;
  req.session.running = running;

  setTimeout(timerFn, INTERVAL, req);

  res.redirect('/');
});

function timerFn(req) {
  if (!running) {
    console.log(`service was stopped, not setting new timer`);
    return;
  }

  runner.execute(req);

  console.log(`Setting new runner to run in ${INTERVAL/1000} seconds`);
  setTimeout(timerFn, INTERVAL, req);
}

router.get('/off', function(req, res, next) {
  running = false;
  req.session.running = false;
  
  console.log('Service & timer stopped');
  res.redirect('/');
});

module.exports = router;