const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node_crud", "root", "23112003", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
