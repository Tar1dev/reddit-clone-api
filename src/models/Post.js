const db = require('../../database/database.js');
const { DataTypes } = require('sequelize');

const Post = db.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
});


module.exports = Post;