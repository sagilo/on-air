require('log-timestamp');
var tokens = require('./tokens');
var graph = require('./graph');
var updateBulb = require('./bulb');

module.exports = async function execute(req) {
    if (!req.isAuthenticated()) {
        console.log(`Not authenticated, not executing`);
        return;
      }
    
    // Get the access token
    var accessToken;
    try {
        accessToken = await tokens.getAccessToken(req);
    } catch (err) {
        req.flash('error_msg', {
        message: 'Could not get access token. Try signing out and signing in again.',
        debug: JSON.stringify(err)
        });
        console.error(`Error getting accessToken: ${JSON.stringify(err)}`);
        return;
    }

    if (!accessToken || accessToken.length == 0) {
        console.error(`No accessToken or length 0`);
        return;
    }

    try {
        var presence = await graph.getPresence(accessToken);
        console.log(`Got presence response: ${JSON.stringify(presence)}`);
        req.session.presence = presence;
    } catch (err) {
        req.flash('error_msg', {
            message: 'Could not fetch events',
            debug: JSON.stringify(err)
        });
        console.error(`Error querying presence: ${JSON.stringify(err)}`);
        return;
    }

    try {
        var availability = presence.availability;
        const busySet = new Set('Busy', 'BusyIdle', 'DoNotDisturb');
        var isBusy = busySet.has(availability);
        updateBulb(isBusy);
    } catch (err) {
        console.error(`Failed to update bulb: ${err}`);
        return;
    }

    return presence;
}
