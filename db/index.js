const Sequelize = require('sequelize');
// const config = require('./config/config');

const sequelize = new Sequelize(
  'papaleradb',
  'mauripavan',
  'M8kV8N0piPMjn17FzVl3ea7s7paEOhdn',
  {
    dialect: 'postgres',
    logging: false,
    host: 'dpg-cncn5cacn0vc73f2u7n0-a.oregon-postgres.render.com',
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
);

module.exports = sequelize;
