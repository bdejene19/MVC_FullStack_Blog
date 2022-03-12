const postRouter = require("express").Router();
const { getBlogPostById } = require("../../helpers/dbQueries");
postRouter.get("/:id", async (req, res) => {
  let { title, content } = await getBlogPostById(req.params.id);
  res.render("tech-article", { title, content });
});
module.exports = postRouter;
