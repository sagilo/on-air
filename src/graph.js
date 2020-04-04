require('log-timestamp');
require('isomorphic-fetch');
var fs = require('fs');
var graph = require('@microsoft/microsoft-graph-client');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getPresence: async function(accessToken, req) {
    const client = getAuthenticatedClient(accessToken);
    const presence = await client
      .api('/me/presence')
      .version('beta')
      // .select('subject,organizer,start,end')
      // .orderby('createdDateTime DESC')
      .get();

    if (req && req.session) {
      req.session.presence = presence;
    }
    return presence;
  },

  getPhoto: async function(accessToken, req, path, filename) {
    const client = getAuthenticatedClient(accessToken);
    await client
      .api('/me/photo/$value')
      .getStream()
      .then((stream) => {
        let writeStream = fs.createWriteStream(`${path}/${filename}`);
        stream.pipe(writeStream).on("error", (err) => {
          throw err;
        });
        writeStream.on("finish", () => {
          console.log(`Wrote user photo to '${path}/${filename}'`);
        });
        writeStream.on("error", (err) => {
          throw err;
        });
      });
      req.session.avatar = `/${filename}`;
      return filename;
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