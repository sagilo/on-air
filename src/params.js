var graph = require('./graph');
var tokens = require('./tokens');

module.exports = async function buildParams(req, extra) {
    var mode = 'stopped';
    var running = false;
    if (typeof req.session !== 'undefined' && typeof req.session.running !== 'undefined') {
        mode = req.session.running ? 'running' : 'stopped';
        running = req.session.running;
    }

    var avatar;
    var presence;
    // take out to middleware
    if (req.session && req.user) {
        var accessToken = await tokens.getAccessToken(req);

        presence = req.session.presence;
        if (!presence) {
            try {
                presence = await graph.getPresence(accessToken, req);
            } catch (err) {
                console.error(`Failed to get presence: ${err}`);
            }
        }

        avatar = req.session.avatar;
        if (!avatar) {
            try {
                var avatarFilename = 'avatar.jpg';
                var avatarPath = './src/public/';
                avatar = await graph.getPhoto(accessToken, req, avatarPath, avatarFilename);
            } catch (err) {
                console.error(`Failed to get photo: ${err}`);
            }
        }
    }

    var params = {
        active: { home: true },
        running,
        mode,
        presence,
        avatar
    };
    return Object.assign(params, extra);
}