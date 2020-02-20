const knex = require('knex');
const app =  require('../src/app');
const helpers = require('./test-helpers');

describe('Beans Endpoints', () => {
  let db;

  const {
    testUsers,
    testBeans,
    testReviews,
  } = helpers.makeBeansFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/beans', () => {
    context('Given no beans', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/beans')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });
    context('Given there are beans in the database', () => {
      beforeEach('insert beans', () =>
        helpers.seedBeansTables(
          db,
          testUsers,
          testBeans,
          testReviews
        )
      );
    });
  });
});
