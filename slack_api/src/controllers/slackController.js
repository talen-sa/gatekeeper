const axios = require('axios');
const qs = require('qs');
const apiUrl = process.env.SLACK_API_URL;

module.exports.getAllUsers = async function() {
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
    return result.data.members;
};

module.exports.getUserById = async function(user_id) {
    const payload = {
        token: process.env.SLACK_ACCESS_TOKEN,
        user: user_id
    };
    let result;
    try {
        result = await axios.get(`${apiUrl}/users.profile.get`, qs.stringify(payload));
    } catch (e) {
        console.log(e);
        result = e;
    }
    return result.data;
};