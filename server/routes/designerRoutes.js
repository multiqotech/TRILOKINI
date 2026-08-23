const express = require('express');
const router = express.Router();
const designerController = require('../controllers/designerController');

router.route('/')
  .get(designerController.getAll)
  .post(designerController.create);

router.route('/:id')
  .get(designerController.getById)
  .put(designerController.update)
  .delete(designerController.deleteOne);

module.exports = router;
