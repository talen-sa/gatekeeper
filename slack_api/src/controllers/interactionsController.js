const message = require('./messageController');
const signature = require('../verifySignature');
const teamService = require('../services/teamService');
let handleInteractions = async function(req, res) {
    if (!signature.isVerified(req)) {
        res.sendStatus(404);
        return;
    } else {
        const {
            type,
            user,
            callback_id,
            submission
        } = JSON.parse(req.body.payload);
        console.log(type);
        if (type === 'dialog_submission') {
            if (callback_id === 'setupTeam') {
                teamService.createTeam(submission.name);

                message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
                res.send('');
            }
            else if (callback_id === 'deleteTeam') {
                teamService.deleteTeam(submission.team);

                message.sendShortMessage(user.id, 'Deleted team: ' + submission.team);
                res.send('');
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}