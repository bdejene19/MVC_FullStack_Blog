const home = require("express").Router();
const { User, BlogPost } = require("../../models/index");
const handleDB = require("../../helpers/dbQueries");
home.get("/", async (req, res) => {
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
  console.log("my new user: ", newUser);
  let createdUser = await User.create(newUser).catch((err) => console.log(err));

  if (!createdUser) {
    res.status(404).json({ message: "Request could not be made" });
    return;
  }
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.email = newUser.email;
    return res.status(201).redirect("/profile");
  });
});

home.post("/signIn", async (req, res) => {
  const selectedUser = await User.findOne({
    include: [{ model: BlogPost }],
    where: {
      email: req.body.email,
    },
  }).catch((err) => console.log(err));

  if (selectedUser) {
    let correctPswd = selectedUser.validPassword(req.body.pswd);

    if (correctPswd) {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.email = req.body.email;
        return res.redirect("/profile");
      });
    } else {
      correctPswd.catch((err) => res.status(404).json(err));
      return;
    }
  } else {
    res.status(404).json({ err: "Sign in could not be completed" });
  }
});

home.get(`/edit/:id`, async (req, res) => {
  if (req.session.loggedIn) {
    let selectedPost = await handleDB
      .getBlogPostById(req.params.id)
      .catch((err) => console.log(err));
    if (selectedPost) {
      const { id, title, content } = selectedPost;

      if (title && content) {
        res.status(201).render("edit-post", {
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
