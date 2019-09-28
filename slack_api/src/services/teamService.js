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
  return new Promise(function(resolve, reject) {
    axios.get(PI_API_URL + '/teams/')
      .then(function (response) {
        for (var team of response.data.data) {
          result.push({label:team.name, value:team.name});
        }
 
        resolve({options: result});
      }).catch(function (error) {
          console.log(error);
          reject(error);
    });
  });
}
module.exports.getAllTeamsStatus = async function() {
  var result = [];
  return new Promise(function(resolve, reject) {
    axios.get(PI_API_URL + '/teams/')
      .then(function (response) {
        for (var team of response.data.data) {
          result.push({team:team.name, status:team.status});
        }
        console.log({teams: result});
        resolve({teams: result});
      }).catch(function (error) {
          console.log(error);
          reject(error);
    });
  });
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