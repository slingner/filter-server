// Require chai and supertest in setup.js
// Configured in package.json
// Load logic for testing

const app = require('../src/app');

describe('App', () => {
  it('GET / responds 200 and \'Hello, Scott!\'', () => {
    return supertest(app)
      .get('/')
      .expect(200, { message: 'Hello, Scott!' });
  });
});