const profile = require("express").Router();

profile.get("/", (req, res) => {
  // res.render("profile");
});

module.exports = profile;
