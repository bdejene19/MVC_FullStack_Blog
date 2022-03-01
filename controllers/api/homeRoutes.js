const home = require("express").Router();

home.get("/", (req, res) => {
  // let posts = [{title: 'hello', description: 'ayoo technology'}, {title: 'User The Champion', description: 'lord commander has returned'}, {title: 'The others', description: 'moon cake'}];
  // posts = posts.map(item => item.get({plain: true}))
  res.render("homepage", { title: "chekc light", description: "hello" });
});

home.get("/login", (req, res) => {
  res.render("login");
});

module.exports = home;
