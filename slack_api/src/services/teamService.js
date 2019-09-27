module.exports.getTeams = function(data) {
    // axios.get('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
    var testData = {
        options: [
          {
            label: "team 1",
            value: "1"
          },
          {
            label: "team 2",
            value: "2"
          },
          {
            label: "team 3",
            value: "3"
          }
        ]
      };
    return testData;
}
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