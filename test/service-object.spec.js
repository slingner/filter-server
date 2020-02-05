// Require module for testing
const ServiceObject = require('../src/ServiceObject.js');
// Require pg
const pg = require('pg');
// Postgres can handle big numbers but JS can't, so fractions and decimals are converted to string when retrieved
// Allows postgres to return both integer and fractional data type
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
// Require knex for test db configuration
const knex = require('knex');

describe('Service object', function() {
  let db;
  let testData = [];

  // Hooks in mocha to connect to the database
  before(() => db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL
  }));

  // Clears previous data in the table
  //if a table has a reference(ref) use raw SQL statement:
  // before(() => () => db.raw('TRUNCATE notes, example_db RESTART IDENTITY CASCADE') 
  // afterEach(() => () => db.raw('TRUNCATE notes, example_db RESTART IDENTITY CASCADE')
  //restart identity will reset the id of the table. Cascade will allow you to clear all tables.
  before(() => db('example_db').truncate());
  afterEach(() => db('example_db').truncate());
    
  // Disconnect the data after each test
  after(() => db.destroy());

  context('Given db has data', () => {
    // Insert test data before each it()
    beforeEach(() => {
      return db
        .into('example_db')
        .insert(testData);
    });

    it();
  });

  context('Given db has no data', () => {
    it();
  });

});