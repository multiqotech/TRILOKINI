const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouriteController');

router.route('/')
  .get(favouriteController.getAll)
  .post(favouriteController.create);

router.route('/:id')
  .get(favouriteController.getById)
  .put(favouriteController.update)
  .delete(favouriteController.deleteOne);

module.exports = router;
