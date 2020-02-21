const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
});

//giving the string db as the knex instance. Need access to knex instance 
app.set('db', db);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));