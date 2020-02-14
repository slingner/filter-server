const express = require('express');
const cbfnservice = require('./cbfn-service');

const cbfnRouter = express.Router();


cbfnRouter
  .route('/:flavor_note_id') 
  .get((req, res, next) => {
    cbfnservice
      .getBeanByFlavorNoteID(req.app.get('db'), req.params.flavor_note_id)
      .then(beans => {
        res.json(beans);
      })
      .catch(next);
  });
  
module.exports = cbfnRouter;