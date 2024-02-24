require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
};
module.exports = config;
