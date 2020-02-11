// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


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
      user_id: users[0].id
    },
    {
      id: 2,
      bean_name: 'test-bean-2',
      bean_origin: 'Costa Rica',
      bean_masl: '1600 Meters',
      bean_grower: 'Ureña Rojas Family',
      bean_process: 'Honey',
      user_id: users[1].id

    },
    {
      id: 3,
      bean_name: 'test-bean-3',
      bean_origin: 'Costa Rica',
      bean_masl: '1600 Meters',
      bean_grower: 'Ureña Rojas Family',
      bean_process: 'Honey',
      user_id: users[2].id
    }
  ];
}


module.exports = {
  makeBeansArray,

};
