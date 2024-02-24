module.exports = {
  DB_PORT: process.env.PORT || 8080,
  DB_NAME: process.env.PORT || 'papaleradb',
  DB_USER: process.env.PORT || null,
  DB_PASSWORD: process.env.PORT || null,
  DB_HOST: process.env.PORT || '127.0.0.1',
  DB_HOSTNAME: process.env.DB_HOST || 'localhost',
  FRONTEND_URL: process.env.PORT || true,
  SSL: process.env.SSL || false,
};
