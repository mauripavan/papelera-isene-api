const Sequelize = require('sequelize');
// const config = require('./config/config');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    hostname: process.env.DB_HOSTNAME,
  },
);

module.exports = sequelize;
