const axios = require('axios');
const PI_API_URL = process.env.PI_API_URL;
let checkStatusCode = function(data) {
  return data.status==='success' ? true : false;
}
// {
//   "status": "success",
//   "data": [
//       {
//           "name": "asd",
//           "status": 0,
//           "board_position": null,
//           "location": "vault"
//       }
//   ]
// }


module.exports.getTeams = async function() {
  var result = [];

  axios.get('http://0.0.0.0:5000/api/teams/')
  .then(function (response) {
    if (checkStatusCode(response)) {
      for (var team in response) {
        result.push({label:team.name, value:team.name});
      }
      var json = {
        options: result
      }
      console.log(json);
      return testData;
    }
    else {
      console.log('error', result);
      return 'error';
    }
  }).catch(function (error) {
      console.log(error);
      return error;
  });
    // var testData = {
    //     options: [
    //       {
    //         label: "team 1",
    //         value: "1"
    //       },
    //       {
    //         label: "team 2",
    //         value: "2"
    //       },
    //       {
    //         label: "team 3",
    //         value: "3"
    //       }
    //     ]
    //   };
}
module.exports.getAllTeamsStatus = async function() {
    // axios.get('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
    var testData = {
        teams: [
          {
            team: "team 1",
            status: "in"
          },
          {
            team: "team 2",
            status: "out"
          },
          {
            team: "team 3",
            status: "in"
          }
        ]
      };
    return testData;
}
module.exports.createTeam = async function(data) {
    // axios.post('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
}
module.exports.updateTeamStatus = async function(team_id, status) {
    // axios.put('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
}

module.exports.deleteTeam = async function(data) {
    // axios.delete('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
}

module.exports.getUser = async function(data) {
    // axios.get('/users/1')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
}
module.exports.deleteUser = async function(data) {
    // axios.delete('/user/1')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
}
module.exports.addUserToTeam = async function(user, team) {
}
module.exports.removeUserFromTeam = async function(user, team) {
}
module.exports.listUsersOnTeam = async function(user, team) {
    var testData = {
        1: "michael",
        2: "test"
    }
    return testData;
}
module.exports.checkIfUserHasMultipleTeams = async function(user_id) {
    // axios.get('/team')
    // .then(function (response) {
    //     console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });
    return {multiple: false, team_id: 'team_id'};
}