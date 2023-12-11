const Sequelize = require("sequelize");

const sequelize = new Sequelize("papelera_isene_db", null, null, {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
