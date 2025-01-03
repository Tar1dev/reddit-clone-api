const database = require('./database.js');
const User = require('../src/models/User.js');
const Post = require('../src/models/Post.js');
require('./associations.js')

database.sync({ force: false })
.then(() => {
    console.log("Database synchronized");
})
.catch((error) => {
    console.error("Error synchronizing the database:", error);
});