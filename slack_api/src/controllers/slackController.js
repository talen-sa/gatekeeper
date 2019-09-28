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
    return new Promise(function(resolve, reject) {
        const payload = {
            token: process.env.SLACK_USER_TOKEN,
            user: user_id
        };
        axios.post(`${apiUrl}/users.info`, qs.stringify(payload)).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            reject(error.data);
        });
    });
};

module.exports.getUsersInChannel = async function(channel) {
    const payload = {
        token: process.env.SLACK_USER_TOKEN,
        channel: channel
    };
    let result;
    try {
        result = await axios.post(`${apiUrl}/channels.info`, qs.stringify(payload));
    } catch (e) {
        console.log(e);
        result = e;
    }
    return result.data.channel.members;
};