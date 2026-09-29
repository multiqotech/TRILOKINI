const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { requireAdmin } = require('../middleware/auth');

router.get('/active', collectionController.getActive);

router.route('/')
  .get(collectionController.getAll)
  .post(requireAdmin, collectionController.create);

router.route('/:id')
  .get(collectionController.getById)
  .put(requireAdmin, collectionController.update)
  .delete(requireAdmin, collectionController.deleteOne);

module.exports = router;
