const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.skip('Reviews Endpoints', function() {
  let db;

  const {
    testBeans,
    testUsers,
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

  describe('POST /api/reviews', () => {
    beforeEach('insert Beans', () =>
      helpers.seedBeansTables(
        db,
        testUsers,
        testBeans
      )
    );

    it('creates a review, responding with 201 and the new review', function() {
      this.retries(3);
      const testBean = testBeans[0];
      const testUser = testUsers[0];
      const newReview = {
        id: testBean.id,
        text: 'Test new review',
        coffee_bean_id: testBean.coffee_bean_id,
        user_id: testUser.id,
      };
      return supertest(app)
        .post('/api/reviews/add')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body.text).to.eql(newReview.text);
          expect(res.body.coffee_bean_id).to.eql(newReview.coffee_bean_id);
          expect(res.body.user.id).to.eql(testUser.id);
          const expectedDate = new Date().toLocaleString();
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect(res =>
          db
            .from('thingful_reviews')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.text).to.eql(newReview.text);
              expect(row.coffee_bean_id).to.eql(newReview.coffee_bean_id);
              expect(row.user_id).to.eql(testUser.id);
              const expectedDate = new Date().toLocaleString();
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });

    const requiredFields = ['text'];

    requiredFields.forEach(field => {
      const testBean = testBeans[0];
      const testUser = testUsers[0];
      const newReview = {
        text: 'Test new review',
        coffee_bean_id: testBean.id
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field];

        return supertest(app)
          .post('/api/reviews/add')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newReview)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });
  });
});
