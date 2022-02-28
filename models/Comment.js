// require sequelize and destructure model and datatypes to create User Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment model as Object
class Comment extends Model {

}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    blog_id: {
        references: {
            model: 'blog_post',
            key: 'id',
        }
    }
    
}, {
    sequelize,
    modelName: 'comment',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
})