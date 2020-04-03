module.exports = function buildParams(req, extra) {
    var mode = 'stopped';
    var running = false;
    if (typeof req.session !== 'undefined' && typeof req.session.running !== 'undefined') {
        mode = req.session.running ? 'running' : 'stopped';
        running = req.session.running;
    }
    var presence;
    if (req.session) {
        presence = req.session.presence;
    }
    var params = {
        active: { home: true },
        running,
        mode,
        presence
    };
    return Object.assign(params, extra);
}