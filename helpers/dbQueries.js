const { User, BlogPost, Comment } = require("../models/index");

const getAllUsers = async () => {
  let totalUsers = User.findAll({
    attributes: ["id", "username", "email", "full_name"],
    include: [{ model: BlogPost }],
  }).catch((err) => console.log(err));

  if (totalUsers) {
    totalUsers = totalUsers.map((user) => user.get({ plain: true }));
    return totalUsers;
  }
};

const getAllBlogPosts = async () => {
  let allPosts = await BlogPost.findAll({
    include: [{ model: Comment }],
  }).catch((err) => console.log(err));

  if (allPosts) {
    allPosts = allPosts.map((post) => post.get({ plain: true }));
    return allPosts;
  }
};

const findUserByEmail = async (email) => {
  let user = await User.findOne({
    include: [{ model: BlogPost }],
    where: {
      email: email,
    },
  }).catch((err) => console.log(err));

  if (user) {
    return user.get({ plain: true });
  }
};

const getBlogPostById = async (id) => {
  let post = await BlogPost.findOne({
    include: [{ model: Comment }],
    where: {
      id: id,
    },
  });

  if (post) {
    post = post.get({ plain: true });
    return post;
  }
};

const createPost = async (userId, title, content) => {
  let newPost = await BlogPost.create({
    title: title,
    content: content,
    user_id: userId,
  }).catch((err) => console.log(err));

  if (newPost) {
    newPost = newPost.get({ plain: true });
    return newPost;
  }
};
const getUsersBlogPosts = async (email) => {
  let user = await findUserByEmail(email);
  let posts = user.blog_posts;
  if (posts) {
    posts = posts.map((post) => post.get({ plain: true }));
    return posts;
  }
};
module.exports = {
  getAllUsers,
  findUserByEmail,
  getUsersBlogPosts,
  getAllBlogPosts,
  getBlogPostById,
  createPost,
};
