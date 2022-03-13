const { User, BlogPost } = require("../../models/index");
const handleDB = require("../../helpers/dbQueries");
const profile = require("express").Router();
const {
  findUserByEmail,
  formatDate,
  updatePostById,
} = require("../../helpers/dbQueries");
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

profile.post("/createPost", async (req, res) => {
  console.log(req.body);
  let { userID, title, blogContent } = req.body;
  let newPost = await handleDB
    .createPost(userID, title, blogContent)
    .catch((err) => res.status(500).json(err));

  if (!newPost) {
    res.status(404).json({ message: "new post request could not be executed" });
    return;
  }
  res.status(200).json({ newPost });
});

profile.put("/updatePost/:id", async (req, res) => {
  let id = req.params.id;

  let { newTitle, newContent } = req.body;
  if (id) {
    let postUpdated = await updatePostById(id, newTitle, newContent).catch(
      (err) => res.status(500).json({ err })
    );

    if (!postUpdated) {
      res.status(404).json({ err: "Put request could not be made" });
      return;
    }

    res.status(200).json(postUpdated);
  }
});
profile.delete("/deletePost/:id", async (req, res) => {
  const id = req.params.id;

  const postDelete = await BlogPost.destroy({
    cascade: "CASCADE",
    where: {
      id: id,
    },
  }).catch((err) => res.status(500).json(err));

  if (postDelete) {
    res.status(301).json(postDelete);
  } else {
    res.status(404).json({ err: "request could not be found" });
  }
});
module.exports = profile;
