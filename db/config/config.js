require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    hostname: 'dpg-cncn5cacn0vc73f2u7n0-a',
    host: 'dpg-cncn5cacn0vc73f2u7n0-a',
  },
};
module.exports = config;
