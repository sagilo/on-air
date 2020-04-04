require('log-timestamp');
var express = require('express');
var execute = require('../checkAndOperateBulb');
var buildParams = require('../params');
var router = express.Router();

/* GET /presence */
router.get('/',
  async function(req, res) {
    var presence = await execute(req);
    req.session.presence = presence;
    req.session.save();
    var params = buildParams(req);
    res.render('presence', params);
  }
);

module.exports = router;