const {Sequelize} = require('sequelize');

const database = new Sequelize({
    dialect:'sqlite',
    storage:'./storage/dev.sqlite',
})

database.sync({ force: false })
.then(() => {
    console.log("Database synchronized");
})
.catch((error) => {
    console.error("Error synchronizing the database:", error);
});

module.exports = database;