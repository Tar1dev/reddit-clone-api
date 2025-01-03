const User = require("../src/models/User.js");
const Post = require("../src/models/Post.js");

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'posts',
})