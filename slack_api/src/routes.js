const commandsController = require('./controllers/commandsController');
const interactionsController = require('./controllers/interactionsController');
const channels = require('./channels');
const slackController = require('./controllers/slackController')

let bot = '';

let handleRoutes = function(app) {
    app.get('/', async (req, res) => {
        //let users = await slackController.getAllUsers();
        //let users = await slackController.getUserById('UNTP2M55W');
        //let test = await slackController.getUsersInChannel('CNH967BPB');
        console.log(users);
        res.send(200);
    });

    app.post('/events', (req, res) => {
        commandsController.run(req, res);
    });

    app.post('/interactions', async (req, res) => {
        interactionsController.run(req, res);
    });

    app.post('/data', async (req, res) => {
        // const rawList = await channels.findAuthedChannels(bot);

        res.sendStatus(JSON.stringify(
            {
                "option_groups": [
                  {
                    "label": "Visual Design",
                    "options": [
                      {
                        "label": "[UXD-342] The button color should be artichoke green, not jalapeño",
                        "value": "UXD-342"
                      }
                    ]
                  },
                  {
                    "label": "Front-End Engineering",
                    "options": [
                      {
                        "label": "[FE-459] Remove the marquee tag",
                        "value": "FE-459"
                      },
                      {
                        "label": "[FE-238] Too many shades of gray in master CSS",
                        "value": "FE-238"
                      }
                    ]
                  }
                ]
              }
        ));

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