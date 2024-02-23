require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    host: '0.0.0.0',
  },
};
module.exports = config;
