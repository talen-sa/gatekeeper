const message = require('./messageController');
const signature = require('../verifySignature');

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
    if (req.body.command === '/in') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            const { user_id } = req.body;
            message.postInMessage(user_id);
            res.send('');
        }
    }
    if (req.body.command === '/out') {
        if (!signature.isVerified(req)) {
            res.sendStatus(404);
            return;
        } else {
            console.log(req.body);
            const { user_id } = req.body;
            message.postOutMessage(user_id);
            res.send('');
        }
    }
}
module.exports.run = function(req, res) {
    handleEvents(req, res);
}