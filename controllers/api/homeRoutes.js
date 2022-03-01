const home = require("express").Router();
const User = require("../../models/User");

home.get("/", (req, res) => {
  // let posts = [{title: 'hello', description: 'ayoo technology'}, {title: 'User The Champion', description: 'lord commander has returned'}, {title: 'The others', description: 'moon cake'}];
  // posts = posts.map(item => item.get({plain: true}))
  res.render("homepage", { title: "chekc light", description: "hello" });
});

home.get("/login", (req, res) => {
  res.render("login");
});

home.post("/signUp", async (req, res) => {
  console.log(req.body);
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    full_name: req.body.name,
    password: req.body.pswd,
  };
  await User.create(newUser).catch((err) => console.log(err));

  console.log("success adding user from signup");
});
module.exports = home;
