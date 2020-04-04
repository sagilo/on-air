require('log-timestamp');

module.exports = {
  getAccessToken: async function(req) {
    if (!req.isAuthenticated()) {
      throw(new Error('Not authenticated'));
    }

    if (!req.user) {
      throw(new Error('No user in request'));
    }

    // Get the stored token
    var storedToken = req.user.oauthToken;
    if (!storedToken) {
      throw(new Error('No stored token'));
    }

    if (storedToken.expired()) {
      // refresh token
      var newToken = await storedToken.refresh();

      // Update stored token
      req.user.oauthToken = newToken;
      return newToken.token.access_token;
    }

    // Token still valid, just return it
    return storedToken.token.access_token;
  }
};