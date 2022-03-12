const postRouter = require("express").Router();
const {
  getBlogPostById,
  findUserByEmail,
  makeComment,
} = require("../../helpers/dbQueries");
postRouter.get("/:id", async (req, res) => {
  const techPost = await getBlogPostById(req.params.id);
  let { title, content, createdAt, comments } = techPost;

  res.render("tech-article", { title, content, createdAt, comments });
});

postRouter.post("/newComment", async (req, res) => {
  if (req.session.loggedIn) {
    let user = await findUserByEmail(req.session.email);

    if (user) {
      const postID = req.body.postID;
      const { username } = user;
      const commentText = req.body.comment;
      let commentCreated = await makeComment(postID, username, commentText);
    }
  } else {
    res.status(404).json({});
  }
});
module.exports = postRouter;
