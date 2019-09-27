const message = require('./messageController');
const signature = require('../verifySignature');
const teamService = require('../services/teamService')

function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key].toString() + "\n");
    });
    return result;
}

let handleEvents = async function(req, res) {
    if (req.body.command === '/create_team') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openCreateTeamDialog(trigger_id);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/delete_team') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openDeleteTeamDialog(trigger_id);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/remove_user') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openRemoveUserDialog(trigger_id);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/add_user') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openAddUserDialog(trigger_id);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/list_teammates') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openListUsersOnTeamDialog(trigger_id);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/set_status') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                const result = await message.openInOutDialog(trigger_id);
                console.log('asd', result);
                if (result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.send('');
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    }
    if (req.body.command === '/whos_here') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                let result = await teamService.getAllTeamsStatus();
                result = json2array(result);
                console.log(result.toString());
                message.sendShortMessage(user_id, `Who's Here:` + result.toString().replace(/[,]/g, ""));
                res.send('');
            } catch (e) {
                console.log('error');
                res.send(500);
            }
        }
    }
}
module.exports.run = function(req, res) {
    handleEvents(req, res);
}