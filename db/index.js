const Sequelize = require('sequelize');
// const config = require('./config/config');

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;
