const db = require('../../database/database.js');
const { DataTypes } = require('sequelize');
const Post = require('./Post');
const User = require('./User');

const Subreddit = db.define('Subreddit', {
    title: DataTypes.STRING,
})

module.exports = Subreddit;