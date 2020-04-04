require('log-timestamp');
var express = require('express');
var execute = require('../checkAndOperateBulb');
var buildParams = require('../params');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (req.session && typeof req.session.presence == 'undefined') {
      var presence = await execute(req);
      req.session.presence = presence;
      req.session.save();
  };
  var params = buildParams(req, { active: { home: true }});
  res.render('index', params);
});

module.exports = router;
