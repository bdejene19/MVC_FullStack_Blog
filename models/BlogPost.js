// require sequelize and destructure model and datatypes to create User Model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create BlogPost model as Object
class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "blog_post",
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = BlogPost;
