const express = require('express');
const BeanListService = require('./beanlist-service');
const { requireAuth } = require('../middleware/jwt-auth');

const beanListRouter = express.Router();


beanListRouter
  .route('/') 
  .get((req, res, next) => {
    BeanListService
      .getAllBeans(req.app.get('db'))
      .then(beans => {
        res.json(beans);
      })
      .catch(next);
  });

beanListRouter
  .route('/:bean_id')
  .all(checkBeanExists)
  .all(requireAuth)
  .get((req, res) => {
    res.json(BeanListService.serializeBean(res.bean))
  })

beanListRouter.route('/:bean_id/reviews/')
  .all(requireAuth)
  .all(checkBeanExists)
  .get((req, res, next) => {
    BeanListService.getReviewsForBean(
      req.app.get('db'),
      req.params.coffee_bean_id
    )
      .then(reviews => {
        res.json(BeanListService.serializeBeanReviews(reviews))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkBeanExists(req, res, next) {
  try {
    const bean = await BeanListService.getById(
      req.app.get('db'),
      req.params.coffee_bean_id
    )

    if (!bean)
      return res.status(404).json({
        error: `Bean doesn't exist`
      })

    res.bean = bean
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = beanListRouter;