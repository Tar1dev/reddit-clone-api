const db = require("../database");
const {DataTypes} = require("sequelize");

const User = db.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    defaultScope: {
        attributes: { exclude: ["password"] }
    }, scopes: {
        withPassword: {
            attributes: {}, // Include all attributes, including password
        },
    },
});

module.exports = User;