require('dotenv').config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgresql',
    logging: false,
  },
};
module.exports = config;
