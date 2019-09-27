const axios = require('axios');

module.exports.getUsersInOrganization = async function() {
    const payload = {
        token: process.env.SLACK_ACCESS_TOKEN,
    };
    return axios.post(`${apiUrl}/dialog.open`, qs.stringify(payload));
};