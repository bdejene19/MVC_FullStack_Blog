const postRouter = require("express").Router();
const {
  getBlogPostById,
  findUserByEmail,
  makeComment,
} = require("../../helpers/dbQueries");
postRouter.get("/:id", async (req, res) => {
  const techPost = await getBlogPostById(req.params.id);
  const { id, title, content, createdAt, comments } = techPost;
  const loggedIn = req.session.loggedIn;

  res.render("tech-article", {
    id,
    title,
    content,
    createdAt,
    comments,
    loggedIn,
  });
});

postRouter.post("/newComment", async (req, res) => {
  if (req.session.loggedIn) {
    console.log("z", req.body);
    let user = await findUserByEmail(req.session.email).catch((err) =>
      console.log(err)
    );

    if (user) {
      const postID = req.body.postID;
      const { username } = user;
      const commentText = req.body.comment;
      let commentCreated = await makeComment(
        postID,
        username,
        commentText
      ).catch((err) => console.log(err));

      if (commentCreated) {
        res.status(201).json({ commentCreated });
      }
    }
  } else {
    res.status(404).json({});
  }
});

module.exports = postRouter;
