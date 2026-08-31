const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/active', collectionController.getActive);

router.route('/')
  .get(collectionController.getAll)
  .post(collectionController.create);

router.route('/:id')
  .get(collectionController.getById)
  .put(collectionController.update)
  .delete(collectionController.deleteOne);

module.exports = router;
