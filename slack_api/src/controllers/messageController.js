'use strict';

const axios = require('axios');
const qs = require('qs');

const apiUrl = process.env.SLACK_API_URL;

const openDialog = async (trigger_id) => {
    const dialogData = {
        token: process.env.SLACK_ACCESS_TOKEN,
        trigger_id: trigger_id,
        dialog: JSON.stringify({
            title: 'Create a Team',
            callback_id: 'setupTeam',
            submit_label: 'Request',
            text: ' ',

            elements: [{
                    type: 'text',
                    name: 'title',
                    label: 'Team Name',
                },

                {
                    type: 'select',
                    name: 'team',
                    label: 'Your team\'s slack channel',
                    data_source: 'channels',
                },
                {
                    type: 'text',
                    name: 'time',
                    label: 'Working Hours?',
                    placeholder: '7:30-4:00'
                }
            ]
        })
    };
    return axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialogData));
};

const postRegistrationMessage = (userId) => {
    try {
        const result = await openDialog(trigger_id);
        if (result.data.error) {
            res.sendStatus(500);
        } else {
            //teamService.createTeam(data);
            message.sendShortMessage(user.id, 'Thanks!');
            res.sendStatus(200);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

const postInMessage = (userId) => {
    let messageData = {
        token: process.env.SLACK_ACCESS_TOKEN,
        channel: userId,
        attachments: JSON.stringify([{
            text: 'Click below if you are in the office.',
            callback_id: 'setStatusAsIn',
            actions: [{
                name: 'start',
                text: 'Set Status as \'IN\'',
                type: 'button',
                value: 'Submit',
            }]
        }])
    };
    send(messageData);
};

const postOutMessage = (userId) => {
    let messageData = {
        token: process.env.SLACK_ACCESS_TOKEN,
        channel: userId,
        attachments: JSON.stringify([{
            text: 'Click below when you are leaving the office',
            callback_id: 'setStatusAsOut',
            actions: [{
                name: 'start',
                text: 'Set Status as \'OUT\'',
                type: 'button',
                value: 'register',
            }]
        }])
    };
    send(messageData);
};



const sendShortMessage = (userId, text) => {
    let data = {
        token: process.env.SLACK_ACCESS_TOKEN,
        channel: userId,
        text: text,
    };
    send(data);
};

const send = async (data) => {
    data.as_user = true; // send DM as a bot, not Slackbot
    const result = await axios.post(`${apiUrl}/chat.postMessage`, qs.stringify(data))
    try {
        if (result.data.error) console.log(`PostMessage Error: ${result.data.error}`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    postRegistrationMessage,
    postInMessage,
    postOutMessage,
    sendShortMessage
};