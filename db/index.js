const Sequelize = require('sequelize');
// const config = require('./config/config');

const sequelize = new Sequelize({
  database: 'papaleradb',
  username: 'mauripavan',
  password: 'M8kV8N0piPMjn17FzVl3ea7s7paEOhdn',
  host: '0.0.0.0',
  hostname: 'pg-cncn5cacn0vc73f2u7n0-a',
  port: 5432,
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = sequelize;
