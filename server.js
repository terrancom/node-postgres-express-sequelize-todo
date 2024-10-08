const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./ORM/models');

// Set up the express app
const app = express();
const port = process.env.PORT || 8000;

//Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Require routes into app
require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of the todo app!!',
}));

if (app.settings.env === "production") {
    db.sequelize.sync().then(() => {
        app.listen(PORT, () => {
            console.log("App listening on PORT " + PORT);
        });
    });
} else {
    db.sequelize.sync({
        force: true
    }).then(() => {
        app.listen(PORT, () => {
            console.log("App listening on PORT " + PORT);
        });
    });
}

app.listen(port, () => console.log(`Listinging on port ${port}`));
