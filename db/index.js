const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
);

module.exports = sequelize;
