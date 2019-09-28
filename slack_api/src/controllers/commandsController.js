const message = require('./messageController');
const signature = require('../verifySignature');
const teamService = require('../services/teamService')

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
                console.log('1',result.teams[0]);
                message.sendShortMessage(user_id, "Who's Here");
                for (var a = 0; a < result.teams.length; a++) {
                    if (result.teams[a].status =='1') {
                        message.sendShortMessage(user_id, `${result.teams[a].team}`);
                    }
                }

                res.send('');
            } catch (e) {
                console.log('error');
                res.send(500);
            }
        }
    }
    if (req.body.command === '/in') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                let result = await teamService.checkIfUserHasMultipleTeams(user_id);
                if (result.multiple === false) {
                    await teamService.updateTeamStatus(result.team_id, 'in');
                    message.sendShortMessage(user_id, "Team Status Set to \'in\'");
                    res.send('');
                }
                else {
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
            } catch (e) {
                console.log('error');
                res.send(500);
            }
        }
    }

    if (req.body.command === '/out') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id, trigger_id } = req.body;
            try {
                let result = await teamService.checkIfUserHasMultipleTeams(user_id);
                if (result.multiple === false) {
                    await teamService.updateTeamStatus(result.team_id, 'out');
                    message.sendShortMessage(user_id, "Team Status Set to \'out\'");
                    res.send('');
                }
                else {
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