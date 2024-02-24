require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    host: '0.0.0.0',
    hostname: 'dpg-cncn5cacn0vc73f2u7n0-a.oregon-postgres.render.com',
  },
};
module.exports = config;
