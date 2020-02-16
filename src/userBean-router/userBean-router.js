const express = require('express');
const userService = require('./userBean-service');
const { requireAuth } = require('../middleware/jwt-auth');

const userBeanRouter = express.Router();

userBeanRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    const userId = req.user.id;
    userService
      .getBeansForUser(req.app.get('db'), userId)
      .then(beans => {
        res.json(beans);
      })
      .catch(next);
  });

module.exports = userBeanRouter;