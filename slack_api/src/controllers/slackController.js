const axios = require('axios');
const qs = require('qs');
const apiUrl = process.env.SLACK_API_URL;

module.exports.getUsersInOrganization = async function() {
    const payload = {
        token: process.env.SLACK_ACCESS_TOKEN,
    };
    let result;
    try {
        result = await axios.post(`${apiUrl}/users.list`, qs.stringify(payload));
    } catch (e) {
        console.log(e);
        result = e;
    }
    return result;
};