const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouriteController');
const { requireAdmin } = require('../middleware/auth');

router.route('/')
  .get(favouriteController.getAll)
  .post(requireAdmin, favouriteController.create);

router.route('/:id')
  .get(favouriteController.getById)
  .put(requireAdmin, favouriteController.update)
  .delete(requireAdmin, favouriteController.deleteOne);

module.exports = router;
