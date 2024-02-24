const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
    host: config.DB_HOSTNAME,
    dialectOptions: {
      ssl: config.DB_SSL,
      rejectUnauthorized: false,
    },
  },
);

module.exports = sequelize;
