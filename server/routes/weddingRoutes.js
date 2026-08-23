const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/weddingController');

router.route('/')
  .get(weddingController.getAll)
  .post(weddingController.create);

router.route('/:id')
  .get(weddingController.getById)
  .put(weddingController.update)
  .delete(weddingController.deleteOne);

module.exports = router;
