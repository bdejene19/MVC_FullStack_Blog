const { User, BlogPost } = require("../../models/index");
const handleDB = require("../../helpers/dbQueries");
const profile = require("express").Router();

profile.get("/", async (req, res) => {
  let userPosts = [];
  console.log("req session email: ", req.session.email);
  if (req.session.loggedIn) {
    userPosts = await User.findOne({
      include: [{ model: BlogPost }],
      where: {
        email: req.session.email,
      },
    });

    let name = userPosts.username;
    let allPosts = await handleDB.getAllBlogPosts();
    if (userPosts) {
      res.render("profile", { loggedIn: req.session.loggedIn, name, allPosts });
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = profile;
