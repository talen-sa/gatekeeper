const commandsController = require('./controllers/commandsController');
const interactionsController = require('./controllers/interactionsController');
const channels = require('./channels');
const slackController = require('./controllers/slackController')
const teamService = require('./services/teamService');
let handleRoutes = function(app) {
    app.get('/', async (req, res) => {
        //let users = await slackController.getAllUsers();
        //let users = await slackController.getUserById('UNTP2M55W');
        //let test = await slackController.getUsersInChannel('CNH967BPB');
        // console.log(users);
        res.send(200);
    });

    app.post('/events', (req, res) => {
        commandsController.run(req, res);
    });

    app.post('/interactions', async (req, res) => {
        interactionsController.run(req, res);
    });

    app.post('/data', async (req, res) => {
        let teams = await teamService.getTeams();
        res.status(200).send(JSON.stringify(teams));

        // let finalList = rawList.map(o => {
        //     return {
        //         value: o.id,
        //         label: `#${o.name}`
        //     };
        // });

        // res.sendStatus(JSON.stringify({
        //     options: finalList
        // }));
    });
}

module.exports.use = function(app) {
    handleRoutes(app);
}