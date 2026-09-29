const express = require('express');
const router = express.Router();
const designerController = require('../controllers/designerController');
const { requireAdmin } = require('../middleware/auth');

router.route('/')
  .get(designerController.getAll)
  .post(requireAdmin, designerController.create);

router.route('/:id')
  .get(designerController.getById)
  .put(requireAdmin, designerController.update)
  .delete(requireAdmin, designerController.deleteOne);

module.exports = router;
