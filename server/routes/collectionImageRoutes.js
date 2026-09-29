const express = require('express');
const router = express.Router();
const collectionImageController = require('../controllers/collectionImageController');
const { requireAdmin } = require('../middleware/auth');

router.route('/')
  .get(collectionImageController.getAll)
  .post(requireAdmin, collectionImageController.create);

router.route('/:id')
  .get(collectionImageController.getById)
  .put(requireAdmin, collectionImageController.update)
  .delete(requireAdmin, collectionImageController.deleteOne);

module.exports = router;
