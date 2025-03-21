export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.BACKEND_PORT
    ? parseInt(process.env.BACKEND_PORT, 10)
    : 3001,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CALLBACK_URL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
  GOOGLE_OAUTH_SCOPE_ONE: process.env.GOOGLE_OAUTH_SCOPE_ONE,
  GOOGLE_OAUTH_SCOPE_TWO: process.env.GOOGLE_OAUTH_SCOPE_TWO,
  SESSION_SALT: process.env.SESSION_SALT,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_DURATION: process.env.JWT_ACCESS_TOKEN_DURATION,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_REFRESH_TOKEN_DURATION: process.env.JWT_REFRESH_TOKEN_DURATION,
  FRONT_END_LINK: process.env.FRONT_END_LINK,
});
