require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    hostname: 'dpg-cncf4i2cn0vc73f1ffhg-a',
    host: '127.0.0.1',
  },
};
module.exports = config;
