module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://scottlingner@localhost/filter_app',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://scottlingner@localhost/filter_app_test', //need to make
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
};