require('log-timestamp');
var express = require('express');
var tokens = require('../tokens');
var graph = require('../graph');
var router = express.Router();

/* GET /presence */
router.get('/',
  async function(req, res) {
    try {
      var accessToken = await tokens.getAccessToken(req);

      await graph.getPresence(accessToken, req);
      res.render('presence');
    } catch (err) {
      console.error(`Error querying presence: ${err}`);
      req.flash('error_msg', {
        message: 'Could not fetch presence',
        debug: JSON.stringify(err)
      });
      res.redirect('/');
    }
  }
);

module.exports = router;