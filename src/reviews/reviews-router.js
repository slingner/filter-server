const express = require('express');
const xss = require('xss');
const ReviewsService = require('./reviews-service');
const { requireAuth } = require('../middleware/jwt-auth');

const reviewsRouter = express.Router();
const bodyParser = express.json();

reviewsRouter
  .route('/')
  .post(bodyParser, requireAuth, (req, res, next) => {
    const beanId = req.body.coffee_bean_id;
    const BeanUser = req.user.id;

    ReviewsService
      .getReviewsForUser(req.app.get('db'), BeanUser, beanId)
      .then(review => {
        res.json(review);
      })
      .catch(next);
  });

reviewsRouter
  .route('/add')
  .post(bodyParser, requireAuth, (req, res, next) => {
    
    const BeanUser = req.user.id;
    const BeanId = req.body.coffee_bean_id;
    const { text } = req.body;
    //protext the text coming in from the review to stop bad injections
    let xssText = xss(text);

    ReviewsService
      .insertToFilterReviews(req.app.get('db'), xssText, BeanId, BeanUser)
      .then(bean_User => {
        res
          .status(201)
          .json(bean_User);
      })
      .catch(next);
  });

reviewsRouter
  .route('/:id')
  .delete((req, res, next) => {
    const { id } = req.params;

    ReviewsService
      .removeReview(req.app.get('db'), id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = reviewsRouter;
