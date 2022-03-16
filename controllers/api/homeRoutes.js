const home = require("express").Router();
const { User, BlogPost } = require("../../models/index");
const handleDB = require("../../helpers/dbQueries");
home.get("/", async (req, res) => {
  // let posts = [{title: 'hello', description: 'ayoo technology'}, {title: 'User The Champion', description: 'lord commander has returned'}, {title: 'The others', description: 'moon cake'}];
  // posts = posts.map(item => item.get({plain: true}))

  // let allBlogPosts = await BlogPost.findAll({
  //   limit: 20,
  // }).catch((err) => console.log(err));

  let posts = await handleDB.getAllBlogPosts();
  posts = posts.map((post) => {
    let tempPost = post;
    tempPost.createdAt = handleDB.formatDate(post.createdAt);
    return tempPost;
  });
  let loggedIn = req.session.loggedIn;
  res.render("homepage", { posts, loggedIn });
});

home.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.status(200).redirect("/profile");
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

home.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).redirect("/login");
    });
  }
});

home.post("/signUp", async (req, res) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    full_name: req.body.name,
    password: req.body.pswd,
  };
  let createdUser = await User.create(newUser).catch((err) => console.log(err));

  if (!createdUser) {
    res.status(400).json({ message: "Request could not be made" });
    return;
  }
  // req.session.save(() => {
  //   req.session.logged_in = res.status(200).json(createdUser);
  // });
  res.status(200).json(createdUser);
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
      req.session.loggedIn = true;
      req.session.email = req.body.email;
      res.redirect("/profile");
    });
  }
});

home.get(`/edit/:id`, async (req, res) => {
  if (req.session.loggedIn) {
    let selectedPost = await handleDB
      .getBlogPostById(req.params.id)
      .catch((err) => console.log(err));
    console.log("z: ", selectedPost);
    if (selectedPost) {
      const { id, title, content } = selectedPost;

      if (title && content) {
        res
          .status(201)
          .render("edit-post", {
            loggedIn: req.session.loggedIn,
            id,
            title,
            content,
          });
        return;
      }
    }
  } else {
    res.redirect("/login");
  }
});
module.exports = home;
