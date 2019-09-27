'use strict';

const axios = require('axios');
const qs = require('qs');
const apiUrl = process.env.SLACK_API_URL;

const postInMessage = (userId) => {
    sendShortMessage(userId, 'Thanks! Don\'t forget to sign out when you leave');
};

const postOutMessage = (userId) => {
    sendShortMessage(userId, 'Thanks! Have a great rest of your day.');
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

const openCreateDialog = async (trigger_id) => {
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

const openDeleteDialog = async (trigger_id) => {
    const dialogData = {
        token: process.env.SLACK_ACCESS_TOKEN,
        trigger_id: trigger_id,
        dialog: JSON.stringify({
            title: 'Delete a Team',
            callback_id: 'setupTeam',
            submit_label: 'Request',
            text: ' ',
            elements: [
                {
                    type: 'select',
                    name: 'team',
                    label: 'Choose the team to delete',
                    data_source: 'external.Teams',
                }
            ]
        })
    };
    return axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialogData));
};

module.exports = {
    openCreateDialog,
    openDeleteDialog,
    postInMessage,
    postOutMessage,
    sendShortMessage
};