const axios = require('axios');
const qs = require('qs');
const apiUrl = process.env.SLACK_API_URL;

module.exports.getUsersInOrganization = async function() {
    const payload = {
        token: process.env.SLACK_ACCESS_TOKEN,
    };
    return axios.post(`${apiUrl}/dialog.open`, qs.stringify(payload));
};