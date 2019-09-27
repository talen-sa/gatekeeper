module.exports.createTeam = function(data) {
    axios.post('/team')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
module.exports.updateTeam = function(data) {
    axios.put('/team')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports.deleteTeam = function(data) {
    axios.delete('/team')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports.setUserStatus = function(data) {
    axios.post('/users')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
module.exports.getUser = function(data) {
    axios.get('/users/1')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
module.exports.deleteUser = function(data) {
    axios.delete('/user/1')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}