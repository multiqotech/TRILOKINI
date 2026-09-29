const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAdmin } = require('../middleware/auth');

router.get('/homepage', productController.getHomepageProducts);
router.get('/bulk-show', productController.getBulkShowProducts);
router.get('/category/:categoryId', productController.getByCategory);

router.route('/')
  .get(productController.getAll)
  .post(requireAdmin, productController.create);

router.route('/:id')
  .get(productController.getById)
  .put(requireAdmin, productController.update)
  .delete(requireAdmin, productController.deleteOne);

module.exports = router;
