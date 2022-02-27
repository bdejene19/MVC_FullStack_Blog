const app = require('express').Router();

const home = require('./api/homeRoutes')
app.use('/', home)

module.exports = app;