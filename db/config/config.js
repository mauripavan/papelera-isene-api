require('dotenv').config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    host: 'dpg-cncn5cacn0vc73f2u7n0-a.oregon-postgres.render.com',
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
};
module.exports = config;
