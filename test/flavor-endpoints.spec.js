const supertest = require('supertest');
const app = require('../src/app');
const { expect } = require('chai');

describe('GET /allflavors', () => {
  it('should return an array of flavors', () => {
    return supertest(app)
      .get('/api/allflavors')
      .expect('Content-Type', /json/);
  });
});