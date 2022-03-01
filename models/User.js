// require sequelize and destructure model and datatypes to create User Model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// require bcrypt for password hashing
const bcrypt = require("bcrypt");

// create User model as Object
class User extends Model {
  // instance method on model to have business logic validation on the backend
  validPassword(pswd) {
    // access column value through the "this" object
    let isValid = bcrypt.compare(pswd, this.password);
    return isValid;
  }
}

// initalize column names and associated types/validations
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // hook to handle data hashing before adding to data base
    hooks: {
      beforeCreate: async (user) => {
        let pswd = user.password;
        user.password = await bcrypt.hash(pswd, 10);
      },
    },

    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
    freezeTableName: true,
  }
);

module.exports = User;
