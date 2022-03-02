const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models/index");
const userData = require("./userSeeds.json");
const blogpostData = require("./blogpostSeeds.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  }).catch((err) => console.log("user creation error"));

  await BlogPost.bulkCreate(blogpostData, {
    individualHooks: true,
    returning: true,
  }).catch((err) => console.log("blog post seeding error"));
  process.exit(0);
};

seedDatabase();
