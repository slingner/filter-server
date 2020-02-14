const express = require('express');
const FlavorService = require('./flavor-service');

const flavorListRouter = express.Router();

flavorListRouter
  .route('/')
  .get((req, res, next) => {
    FlavorService
      .getAllFlavorNotes(req.app.get('db'))
      .then(flavors => {
        res.json(flavors);
      })
      .catch(next);
  });

// flavorListRouter
//   .route('/:flavor_id')
//   .get((req, res, next) => {
//     FlavorService
//       .getBeanByFlavorNoteID((req.app.get('db'), req.params.flavor_note_id))
//       .then(flavors => {
//         res.json(flavors);
//       })
//       .catch(next);
//   });

module.exports = flavorListRouter;