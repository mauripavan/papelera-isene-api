module.exports = {
  DB_PORT: process.env.PORT || process.env.LOCAL_PORT,
  DB_NAME: process.env.DB_NAME || process.env.LOCAL_DB_NAME,
  DB_USER: process.env.DB_USER || null,
  DB_PASSWORD: process.env.DB_PASSWORD || null,
  DB_HOST: process.env.DB_HOST || process.env.LOCAL_DB_HOST,
  DB_HOSTNAME: process.env.DB_HOSTNAME || process.env.LOCAL_DB_HOST,
  FRONTEND_URL: process.env.FRONTEND_URL || true,
  DB_SSL: process.env.DB_SSL || false,
  JWT_SECRET: process.env.JWT_SECRET || process.env.LOCAL_JWT_SECRET,
};
