const express = require('express');
const BeanListService = require('./beanlist-service');
const { requireAuth } = require('../middleware/jwt-auth');

const beanListRouter = express.Router();
const bodyParser = express.json();

beanListRouter
  .route('/') 
  .get((req, res, next) => {
    if(req.query.flavor_note_id) {
      const requestedFlavors = req.query.flavor_note_id.split(',');
      // let noDupes = [...new Set(requestedFlavors)];
      BeanListService
        .getBeanByFlavorNoteID(req.app.get('db'), requestedFlavors)
        .then(beans => {
          res.json(beans);
        })
        .catch(next);
    } else {
      BeanListService
        .getAllBeans(req.app.get('db'))
        .then(beans => {
          res.json(beans);
        })
        .catch(next);
    }
  });

beanListRouter
  .route('/')
  .get((req, res, next) => {
    const userId = req.user.id;
    BeanListService
      .getBeansForUser(req.app.get('db'), userId)
      .then(beans => {
        res.json(beans);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const  { coffee_bean_id } = req.body;
    
    BeanListService
      .insertBeanIdToUsersCoffeeBeanIdTable(req.app.get('db'), coffee_bean_id)
      .then(beanId => {
        res
          .status(201);
      })
      .catch(next);
  });


    
  

  

// beanListRouter
//   .route('/:bean_id')
//   .get((req, res, next) => {
//     BeanListService
//       .getBeanById(req.app.get('db'), req.params.bean_id)
//       .then(beans => {
//         res.json(beans);
//       })
//       .catch(next);
//   });


// beanListRouter.route('/:bean_id/reviews/')
//   .all(requireAuth)
//   .all(checkBeanExists)
//   .get((req, res, next) => {
//     BeanListService.getReviewsForBean(
//       req.app.get('db'),
//       req.params.coffee_bean_id
//     )
//       .then(reviews => {
//         res.json(BeanListService.serializeBeanReviews(reviews))
//       })
//       .catch(next)
//   })

// /* async/await syntax for promises */
// async function checkBeanExists(req, res, next) {
//   try {
//     const bean = await BeanListService.getById(
//       req.app.get('db'),
//       req.params.coffee_bean_id
//     )

//     if (!bean)
//       return res.status(404).json({
//         error: `Bean doesn't exist`
//       })

//     res.bean = bean
//     next()
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = beanListRouter;