require('log-timestamp');
var graph = require('./graph');
var tokens = require('./tokens');
var updateBulb = require('./bulb');

module.exports = {
    execute: async function(req) {
        var accessToken = await tokens.getAccessToken(req);
        var presence = await graph.getPresence(accessToken, req);
        console.log(`Got presence response: ${JSON.stringify(presence)}`);

        var availability = presence.availability;
        const busySet = new Set('Busy', 'BusyIdle', 'DoNotDisturb');
        var isBusy = busySet.has(availability);
        await updateBulb(isBusy);
        return presence;
    }
}