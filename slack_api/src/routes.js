const commandsController = require('./controllers/commandsController');
const interactionsController = require('./controllers/interactionsController');
const channels = require('./channels');
let bot = '';

let handleRoutes = function(app) {
    app.get('/', async (req, res) => {
        res.sendStatus('<h2>Running</h2>');
        let users = await slackController.getUsersInOrganization();
        console.log(users);
    });

    app.post('/events', (req, res) => {
        commandsController.run(req, res);
    });

    app.post('/interactions', async (req, res) => {
        interactionsController.run(req, res);
    });

    app.post('/channels', async (req, res) => {
        const rawList = await channels.findAuthedChannels(bot);

        let finalList = rawList.map(o => {
            return {
                value: o.id,
                label: `#${o.name}`
            };
        });

        res.sendStatus(JSON.stringify({
            options: finalList
        }));
    });
}

module.exports.use = function(app) {
    handleRoutes(app);
}