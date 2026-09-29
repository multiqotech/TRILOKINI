const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/weddingController');
const { requireAdmin } = require('../middleware/auth');

router.route('/')
  .get(weddingController.getAll)
  .post(requireAdmin, weddingController.create);

router.route('/:id')
  .get(weddingController.getById)
  .put(requireAdmin, weddingController.update)
  .delete(requireAdmin, weddingController.deleteOne);

module.exports = router;
