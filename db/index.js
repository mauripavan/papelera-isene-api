const Sequelize = require('sequelize');
// const config = require('./config/config');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;
