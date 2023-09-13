const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node_crud", "root", "23112003", {
    dialect: "mysql",
    host: process.env.DB_HOST,
});

module.exports = sequelize;
