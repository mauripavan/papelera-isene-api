module.exports = {
  DB_PORT: process.env.PORT || 8080,
  DB_NAME: process.env.DB_NAMEPORT || 'papaleradb',
  DB_USER: process.env.DB_USER || null,
  DB_PASSWORD: process.env.DB_PASSWORD || null,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || true,
  DB_SSL: process.env.DB_SSL || false,
  JWT_SECRET: 'papelera',
};
