const message = require('./messageController');
const signature = require('../verifySignature');
const axios = require('axios');
const qs = require('querystring');
const teamService = require('../services/teamService');


const apiUrl = process.env.SLACK_API_URL;


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
        console.log(type,callback_id);
        if (type === 'interactive_message') {
            if (callback_id === 'registerTeam') {
                // try {
                //     const result = await openDialog(trigger_id);
                //     if (result.data.error) {
                //         res.sendStatus(500);
                //     } else {
                //         //teamService.createTeam(data);
                //         message.sendShortMessage(user.id, 'Thanks!');
                //         res.sendStatus(200);
                //     }
                // } catch (err) {
                //     res.sendStatus(500);
                // }
            } else if (callback_id === 'setStatusAsIn') {
                //teamService.setUserStatus(data);
                message.sendShortMessage(user.id, 'Thanks! Don\'t forget to sign out when you leave');
                res.sendStatus(200);
            } else if (callback_id === 'setStatusAsOut') {
                //teamService.setUserStatus(data);
                message.sendShortMessage(user.id, 'Thanks! Have a great rest of your day.');
                res.sendStatus(200);
            }
        }
        else if (type === 'dialog_submission') {
            message.sendShortMessage(user.id, 'Thanks! Your team has been registered.');
            res.send('');
        }
    }
}
module.exports.run = function(req, res) {
    handleInteractions(req, res);
}