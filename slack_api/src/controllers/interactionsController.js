const message = require('./messageController');
const signature = require('../verifySignature');

let handleInteractions = async function(req, res) {
    if (!signature.isVerified(req)) {
        res.sendStatus(404);
        return;
    } else {
        const {
            type,
            user,
            trigger_id,
            callback_id,
            actions,
            response_url,
            submission
        } = JSON.parse(req.body.payload);

        console.log(type, callback_id);

        if (type === 'dialog_submission') {
            if (callback_id === 'setupTeam') {
                message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
                res.send('');
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}