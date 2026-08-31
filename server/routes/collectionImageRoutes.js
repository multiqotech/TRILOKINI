const express = require('express');
const router = express.Router();
const collectionImageController = require('../controllers/collectionImageController');

router.route('/')
  .get(collectionImageController.getAll)
  .post(collectionImageController.create);

router.route('/:id')
  .get(collectionImageController.getById)
  .put(collectionImageController.update)
  .delete(collectionImageController.deleteOne);

module.exports = router;
