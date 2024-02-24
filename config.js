module.exports = {
  DB_PORT: process.env.PORT || 8080,
  DB_NAME: process.env.DB_NAMEPORT || 'papaleradb',
  DB_USER: process.env.DB_USER || null,
  DB_PASSWORD: process.env.DB_PASSWORD || null,
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || true,
  SSL: process.env.SSL || false,
};
