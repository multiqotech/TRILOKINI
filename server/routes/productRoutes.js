const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/homepage', productController.getHomepageProducts);
router.get('/category/:categoryId', productController.getByCategory);

router.route('/')
  .get(productController.getAll)
  .post(productController.create);

router.route('/:id')
  .get(productController.getById)
  .put(productController.update)
  .delete(productController.deleteOne);

module.exports = router;
