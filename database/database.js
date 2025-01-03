const {Sequelize} = require('sequelize');

const database = new Sequelize({
    dialect:'sqlite',
    storage:'./storage/dev.sqlite',
})

module.exports = database;