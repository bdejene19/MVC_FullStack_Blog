const home = require("express").Router();
const { User, BlogPost } = require("../../models/index");

home.get("/", async (req, res) => {
  // let posts = [{title: 'hello', description: 'ayoo technology'}, {title: 'User The Champion', description: 'lord commander has returned'}, {title: 'The others', description: 'moon cake'}];
  // posts = posts.map(item => item.get({plain: true}))

  let allBlogPosts = await BlogPost.findAll({
    limit: 20,
  }).catch((err) => console.log(err));

  let posts = allBlogPosts.map((post) => post.get({ plain: true }));
  res.render("homepage", { posts });
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

home.post("/signIn", async (req, res) => {
  const selectedUser = await User.findOne({
    include: [{ model: BlogPost }],
    where: {
      email: req.body.email,
    },
  }).catch((err) => console.log(err));

  let correctPswd = selectedUser.validPassword(req.body.pswd);

  if (correctPswd) {
    req.session.save(() => {
      req.session.logged_in = true;
    });
    console.log("hit");
    console.log("_____________________");
  }
  res.render("profile");
});
module.exports = home;
