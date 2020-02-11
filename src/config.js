module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://scottlingner@localhost/filter_app',
  TEST_DB_URL: process.env.DB_URL || 'postgresql://scottlingner@localhost/filter_app_test', //need to make
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
};