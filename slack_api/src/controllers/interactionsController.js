const message = require('./messageController');
const signature = require('../verifySignature');
const teamService = require('../services/teamService');
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

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
                    await teamService.createTeam(submission.name);
                    message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'deleteTeam') {
                try {
                    await teamService.deleteTeam(submission.team);
                    message.sendShortMessage(user.id, 'Deleted team: ' + submission.team);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'listTeam') {
                try {
                    let result = await teamService.listUsersOnTeam(submission.team);
                    
                    message.sendShortMessage(user.id, 'Teammates:\n' + json2array(result));
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'addUser') {
                try {
                    await teamService.addUserToTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `Successfully added user to the team: ${submission.team}`);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    res.send(500);
                }
            }
            else if (callback_id === 'removeUser') {
                try {
                    await teamService.removeUserFromTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `Successfully removed user from the team: ${submission.team}`);
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