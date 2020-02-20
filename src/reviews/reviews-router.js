const express = require('express');
// const path = require('path');
const ReviewsService = require('./reviews-service');
const { requireAuth } = require('../middleware/jwt-auth');

const reviewsRouter = express.Router();
const bodyParser = express.json();


reviewsRouter
  .route('/')
  .get(requireAuth, bodyParser, (req, res, next) => {
    const BeanUser = req.user.id;
    ReviewsService
      .getReviewsForUser(req.app.get('db'), BeanUser)
      .then(review => {
        res.json(review);
      })
      .catch(next);
  });


reviewsRouter
  .route('/')
  .post(bodyParser, requireAuth, (req, res, next) => {
    
    const BeanUser = req.user.id;
    const BeanId = req.body.coffee_bean_id;
    const { text } = req.body;

    ReviewsService
      .insertToFilterReviews(req.app.get('db'), text, BeanId, BeanUser)
      .then(bean_User => {
        res
          .status(201)
          .json(bean_User);
      })
      .catch(next);
  });



module.exports = reviewsRouter;
