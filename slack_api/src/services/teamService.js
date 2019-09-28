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
        resolve({teams: result});
      }).catch(function (error) {
          console.log(error);
          reject(error);
    });
  });
}
module.exports.createTeam = async function(team_name) {
  return new Promise(function(resolve, reject) {
    axios.post(PI_API_URL + '/teams/', 
    {
      name: team_name
    }).then(function (response) {
        resolve('success');
      }).catch(function (error) {
          console.log(error.data);
          reject(error);
    });
  });
}
module.exports.updateTeamStatus = async function(team_id, status_text) {
  let status_code = (status_text === 'in' ? 1 : 0);
  return new Promise(function(resolve, reject) {
    axios.patch(PI_API_URL + '/teams/'  + team_name, 
    {
      status: status_code
    }).then(function (response) {
        resolve('success');
      }).catch(function (error) {
          console.log(error.data);
          reject(error);
    });
  });
}

module.exports.deleteTeam = async function(team_name) {
  return new Promise(function(resolve, reject) {
    axios.delete(PI_API_URL + '/teams/' + team_name)
      .then(function (response) {
        resolve('success');
      }).catch(function (error) {
          console.log(error);
          reject(error);
    });
  });
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