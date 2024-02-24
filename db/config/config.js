require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    hostname: 'dpg-cncn5cacn0vc73f2u7n0-a',
    host: '0.0.0.0',
    user: 'mauricio',
    password: 'M8kV8N0piPMjn17FzVl3ea7s7paEOhdn',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
module.exports = config;
