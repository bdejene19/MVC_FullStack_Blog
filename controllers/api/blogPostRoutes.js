const postRouter = require("express").Router();
const {
  getBlogPostById,
  findUserByEmail,
  makeComment,
  formatDate,
} = require("../../helpers/dbQueries");
postRouter.get("/:id", async (req, res) => {
  const techPost = await getBlogPostById(req.params.id);
  const createdAt = formatDate(techPost.createdAt);
  const { id, title, content, comments } = techPost;
  const loggedIn = req.session.loggedIn;

  let formatComments = techPost.comments.map((comment) => {
    let tempComment = comment;
    tempComment.createdAt = formatDate(comment.createdAt);
    return tempComment;
  });
  return res.render("tech-article", {
    id,
    title,
    content,
    createdAt,
    formatComments,
    loggedIn,
  });
});

postRouter.post("/newComment", async (req, res) => {
  if (req.session.loggedIn) {
    let user = await findUserByEmail(req.session.email).catch((err) =>
      console.log(err)
    );
    const postID = req.body.postID;

    if (user) {
      const { username } = user;
      const commentText = req.body.comment;
      let commentCreated = await makeComment(
        postID,
        username,
        commentText
      ).catch((err) => console.log(err));

      if (commentCreated) {
        return res.status(201).json({ commentCreated });
      }
    } else {
      return res.status(404).redirect(`/posts/${postID}`);
    }
  }
});

module.exports = postRouter;
