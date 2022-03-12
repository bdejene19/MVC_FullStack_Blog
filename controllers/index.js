const app = require("express").Router();

const home = require("./api/homeRoutes");
const profile = require("./api/profileRoutes");
const blogPosts = require("./api/blogPostRoutes");
app.use("/", home);
app.use("/profile", profile);
app.use("/posts", blogPosts);

module.exports = app;
