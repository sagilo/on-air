require('log-timestamp');
var express = require('express');
var graph = require('../graph');
var tokens = require('../tokens');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    if (req.session && req.session.user && typeof req.session.presence == 'undefined') {
        var accessToken = await tokens.getAccessToken(req);
        // use to populate presence into req.session
        await graph.getPresence(accessToken, req);
    };
    res.render('index');
  } catch (err) {
    res.render('index', { error: err });
  }
});

module.exports = router;
