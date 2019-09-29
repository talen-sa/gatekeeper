const message = require('./messageController');
const signature = require('../verifySignature');
const teamService = require('../services/teamService');

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key].name + "\n");
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

        if (type === 'dialog_submission') {
            if (callback_id === 'setupTeam') {
                try {
                    let result = await teamService.createTeam(submission.name, submission.location.replace(/[ ]/g, '_'), submission.board_position);
                    message.sendShortMessage(user.id, `*Your team has been registered.*\n *Your board position is:* \`${submission.board_position}\``);
                    res.send('');
                } catch (e) {
                    console.log('error', e);
                    message.sendShortMessage(user.id, '*Oops, that name or board position is already taken.*');
                    res.send('');
                }
            }
            else if (callback_id === 'deleteTeam') {
                try {
                    await teamService.deleteTeam(submission.team);
                    message.sendShortMessage(user.id, `*Deleted team:* \`${submission.team}\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed To Delete Team*`);
                    res.send('');
                }
            }
            else if (callback_id === 'listTeam') {
                try {
                    let result = await teamService.listUsersOnTeam(submission.team);
                    let teamResult = await teamService.getTeamByID(submission.team);
                    let team = teamResult.data;
                    result = json2array(result);
                    let formattedList = []
                    for (var person of result) {
                        person = person.replace(/[\n]/g, "");
                        formattedList.push(`\`${person}\`\n`);
                    }
                    if (result.length != 0) {
                        message.sendShortMessage(user.id, `:gatekeeper:\n*Team Info*\n *Team Name: *\`${submission.team}\`\n *Board position: *\`${team.board_position}\`\n *location: * \`${team.location}\`\n Members: *\n` +  formattedList.toString().replace(/[,]/g, ""));
                    }
                    else {
                        message.sendShortMessage(user.id, `*The team \`${submission.team}\` has no teammates yet.*`);
                    }
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed To List Teams*`);
                    res.send('');
                }
            }
            else if (callback_id === 'addUser') {
                try {
                    await teamService.addUserToTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `*Successfully added user to the team:* \`${submission.team}\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed to add user*`);
                    res.send('');
                }
            }
            else if (callback_id === 'removeUser') {
                try {
                    await teamService.removeUserFromTeam(submission.user, submission.team);
                    message.sendShortMessage(user.id, `*Successfully removed user from the team:* \`${submission.team}\``);
                    res.send('');
                } catch (e) {
                    message.sendShortMessage(user.id, `*That user is not currently on team:* \`${submission.team}\``);
                    res.send('');
                }
            }
            else if (callback_id === 'inout') {
                try {
                    await teamService.updateTeamStatus(submission.team, submission.status);
                    message.sendShortMessage(user.id, `*Successfully set \`${submission.team}'s\` status to:* \`${submission.status}\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed To Set Status*`);
                    res.send('');
                }
            }
            else if (callback_id === 'in') {
                try {
                    await teamService.updateTeamStatus(submission.team, 'in');
                    message.sendShortMessage(user.id, `*Successfully set \`${submission.team}'s\` status to:* \`in\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed To Set Status*`);
                    res.send('');
                }
            }
            else if (callback_id === 'out') {
                try {
                    await teamService.updateTeamStatus(submission.team, 'out');
                    message.sendShortMessage(user.id, `*Successfully set \`${submission.team}'s\` status to:* \`out\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed To Set Status*`);
                    res.send('');
                }
            }
            else if (callback_id === 'updatePosition') {
                try {
                    await teamService.updateTeamPosition(submission.team, Number(submission.board_position));
                    message.sendShortMessage(user.id, `*Successfully updated \`${submission.team}'s\` board position to:* \`${submission.board_position}\``);
                    res.send('');
                } catch (e) {
                    console.log('error');
                    message.sendShortMessage(user.id, `*Failed Updating Board Position*`);
                    res.send('');
                }
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}