const express = require('express');
const BeanListService = require('./beanlist-service');
const { requireAuth } = require('../middleware/jwt-auth');
const logger = require('../logger');

const beanListRouter = express.Router();
const bodyParser = express.json();

beanListRouter
  .route('/') 
  .get((req, res, next) => {
    if(req.query.flavor_note_id) {
      const requestedFlavors = req.query.flavor_note_id.split(',');
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
  })
  .post(bodyParser, requireAuth, (req, res, next) => {
    
    const BeanUser = req.user.id;
    const BeanId = req.body.coffee_bean_id;

    BeanListService
      .insertToSavedTable(req.app.get('db'), BeanId, BeanUser)
      .then(bean_User => {
        res
          .status(201)
          .json(bean_User);
      })
      .catch(next);
  });

beanListRouter
  .route('/:beanId')
  .get((req, res, next) => {
    const { id } = req.params;
    BeanListService
      .getBeanById(req.app.get('db'), id)
      .then(bean => {
        if(!bean) {
          logger.error('Bean Not Found');
          return res
            .status(404)
            .json({ error: { message: 'Note not found' }});
        }
        res.bean = bean;
        next();
      })
      .catch(next);
  });

module.exports = beanListRouter;