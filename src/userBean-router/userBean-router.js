const express = require('express');
const userService = require('./userBean-service');
const { requireAuth } = require('../middleware/jwt-auth');

const userBeanRouter = express.Router();
// const bodyParser = express.json();

userBeanRouter
  .get('/', requireAuth, (req, res, next) => {
    const userId = req.user.id;
    if(req.query.flavor_note_id) {
      const requestedFlavors = req.query.flavor_note_id.split(',');
      userService
        .getBeanByUserAndFlavor(req.app.get('db'), userId, requestedFlavors)
        .then(beans => {
          res.json(beans);
        })
        .catch(next);
    } else {
      userService
        .getBeansForUser(req.app.get('db'), userId)
        .then(beans => {
          res.json(beans);
        })
        .catch(next);
    }
  })
  .delete('/:id', requireAuth, (req, res, next) => {
    const { id } = req.params; 
    const userId = req.user.id;

    userService
      .removeBeanFromUserList(req.app.get('db'), userId, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });


module.exports = userBeanRouter;


