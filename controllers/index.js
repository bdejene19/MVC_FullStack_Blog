const app = require("express").Router();

const home = require("./api/homeRoutes");
const profile = require("./api/profileRoutes");
app.use("/", home);
app.use("/profile", profile);

module.exports = app;
