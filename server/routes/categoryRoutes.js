const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/homepage', categoryController.getHomepageCategories);

router.route('/')
  .get(categoryController.getAll)
  .post(categoryController.create);

router.route('/:id')
  .get(categoryController.getById)
  .put(categoryController.update)
  .delete(categoryController.deleteOne);

module.exports = router;
