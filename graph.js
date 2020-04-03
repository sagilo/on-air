require('log-timestamp');
var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getPresence: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const presence = await client
      .api('/me/presence')
      .version('beta')
      // .select('subject,organizer,start,end')
      // .orderby('createdDateTime DESC')
      .get();

    return presence;
  }
};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}