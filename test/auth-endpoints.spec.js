const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', () => {
  let db;
  
  const { testUsers } = helpers.makeBeansFixtures();
  const testUser = testUsers[0];

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

  describe('POST /api/auth/login', () => {
    beforeEach('insert users', () => 
      helpers.seedUsers(
        db,
        testUsers
      )
    );
    const requiredFields = ['user_name', 'password'];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_name: testUser.user_name,
        password: testUser.password,
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect( 400, {
            error: `Missing '${field}' in request body`});
      });
    });
  
    it('responds 400 \'invalid user_name or password\' when bad user_name', () => {
      const userInvalidUser = { user_name: 'user-not', password: 'existy' };
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, { error: 'Incorrect user_name or password' });
    });

    it('responds 400 \'invalid user_name or password\' when bad user_name', () => {
      const userInvalidPassword = { user_name: testUser.user_name, password: 'incorrect' };
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPassword)
        .expect(400, { error: 'Incorrect user_name or password' });
    });
  });
});
