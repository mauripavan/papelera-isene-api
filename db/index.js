const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
    host: process.env.HOSTNAME,
    dialectOptions: {
      ssl: config.NODE_ENV === 'production',
      rejectUnauthorized: false,
    },
  },
);

module.exports = sequelize;
