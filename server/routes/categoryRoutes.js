const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { requireAdmin } = require('../middleware/auth');

router.get('/homepage', categoryController.getHomepageCategories);
router.get('/bulk-show', categoryController.getBulkShowCategories);

router.route('/')
  .get(categoryController.getAll)
  .post(requireAdmin, categoryController.create);

router.route('/:id')
  .get(categoryController.getById)
  .put(requireAdmin, categoryController.update)
  .delete(requireAdmin, categoryController.deleteOne);

module.exports = router;
