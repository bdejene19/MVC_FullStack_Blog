const { User, BlogPost } = require("../../models/index");
const handleDB = require("../../helpers/dbQueries");
const profile = require("express").Router();
const { findUserByEmail, formatDate } = require("../../helpers/dbQueries");
profile.get("/", async (req, res) => {
  let user = null;
  if (req.session.loggedIn) {
    user = await findUserByEmail(req.session.email);

    let usersPosts = user.blog_posts;
    // usersPosts = usersPosts.map((post) => post.get({ plain: true }));
    let name = user.username;
    let userId = user.id;
    let allPosts = usersPosts;
    if (user) {
      res.render("profile", {
        loggedIn: req.session.loggedIn,
        name,
        allPosts,
        userId,
      });
    }
  } else {
    res.redirect("/login");
  }
});

profile.post("/createPost", (req, res) => {
  console.log(req.body);
  let { userID, title, blogContent } = req.body;
  let newPost = BlogPost.create({
    title: title,
    content: blogContent,
    user_id: userID,
  }).catch((err) => res.status(500).json({ err }));

  if (!newPost) {
    res.status(404).json({ message: "new post request could not be executed" });
    return;
  }
  res.status(200).json({ newPost });
});
module.exports = profile;
