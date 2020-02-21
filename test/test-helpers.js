const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}


function makeBeansArray(users) {
  return [
    {
      id: 1,
      bean_name: 'COSTA RICA BLACK HONEY LOS CIPRESES', 
      bean_origin: 'Costa Rica',
      bean_masl: '1600 Meters',
      bean_grower: 'Ureña Rojas Family',
      bean_process: 'Honey',
      flavor_notes: 'test, test, test',
    },
    {
      id: 2,
      bean_name: 'test-bean-2',
      bean_origin: 'Costa Rica',
      bean_masl: '1600 Meters',
      bean_grower: 'Ureña Rojas Family',
      bean_process: 'Honey',
      flavor_notes: 'test, test, test',

    },
    {
      id: 3,
      bean_name: 'test-bean-3',
      bean_origin: 'Costa Rica',
      bean_masl: '1600 Meters',
      bean_grower: 'Ureña Rojas Family',
      bean_process: 'Honey',
      flavor_notes: 'test, test, test',
    }
  ];
}

function makeReviewsArray(users, beans) {
  return [
    {
      id: 1,
      text: 'First test review!',
      date_created: '2029-01-22T16:28:32.615Z',
      coffee_bean_id: beans[0].id,
      user_id: users[0].id,
    },
    {
      id: 2,
      text: 'Second test review!',
      date_created: '2029-01-22T16:28:32.615Z',
      coffee_bean_id: beans[0].id,
      user_id: users[1].id,
    },
    {
      id: 3,
      text: 'Third test review!',
      date_created: '2029-01-22T16:28:32.615Z',
      coffee_bean_id: beans[0].id,
      user_id: users[2].id,
    },
    {
      id: 4,
      text: 'Fourth test review!',
      date_created: '2029-01-22T16:28:32.615Z',
      coffee_bean_id: beans[0].id,
      user_id: users[3].id,
    },
    {
      id: 5,
      text: 'Fifth test review!',
      date_created: '2029-01-22T16:28:32.615Z',
      coffee_bean_id: beans[beans.length - 1].id,
      user_id: users[0].id,
    }
  ];
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user, //this grabs all key values from the user obj
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('filter_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('filter_users_id_seq', ?)`, //? is a placeholder, replaced by 2nd arg
        [users[users.length - 1].id],
      )
    )
}

function makeBeansFixtures() {
  const testUsers = makeUsersArray();
  const testBeans = makeBeansArray(testUsers);
  const testReviews = makeReviewsArray(testUsers, testBeans);
  return { testUsers, testBeans, testReviews };
}


function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      coffee_beans,
      filter_users,
      filter_reviews
      RESTART IDENTITY CASCADE`
  );
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

function seedBeansTables(db, users, beans, reviews=[]) {
  return db.transaction( async trx => {
    await seedUsers(trx, users)
    await trx.into("coffee_beans").insert(beans)
    await trx.raw(
      `SELECT setval('coffee_beans_id_seq', ?)`, 
      [beans[beans.length - 1].id],
    )
    if(reviews.length) {
      await trx.into('filter_reviews').insert(reviews)
      await trx.raw(
        `SELECT setval('filter_reviews_id_seq', ?)`, 
        [reviews[reviews.length - 1].id],
      )
    }
  })
}

module.exports = {
  makeUsersArray,
  makeBeansArray,
  cleanTables,
  makeAuthHeader,
  makeBeansFixtures,
  seedUsers,
  seedBeansTables
};
