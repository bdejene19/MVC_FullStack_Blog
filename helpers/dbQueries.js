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
  }
};
module.exports = {
  getAllUsers,
  getAllBlogPosts,
  findUserByEmail,
  getBlogPostById,
};
