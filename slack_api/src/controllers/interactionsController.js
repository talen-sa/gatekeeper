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
        console.log(submission);
        if (type === 'dialog_submission') {
            if (callback_id === 'setupTeam') {
                try {
                    teamService.createTeam(submission.name);
                    message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'deleteTeam') {
                try {
                    teamService.deleteTeam(submission.team);
                    message.sendShortMessage(user.id, 'Deleted team: ' + submission.team);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'addUser') {
                try {
                    teamService.addUserToTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `Added ${submission.user} to team: ${submission.team}`);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'removeUser') {
                try {
                    teamService.removeUserFromTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `Removed ${submission.user} from team: ${submission.team}`);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}