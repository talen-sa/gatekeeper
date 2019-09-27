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
                try {
                    teamService.createTeam(submission.name);
                    message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.status(401).send('We had some trouble creating your team.');
                }
            }
            else if (callback_id === 'deleteTeam') {
                try {
                    teamService.deleteTeam(submission.team);
                    message.sendShortMessage(user.id, 'Deleted team: ' + submission.team);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.status(401).send('We had some trouble creating your team.');
                }
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}