const express = require('express');
const router = express.Router();
const celebrityController = require('../controllers/celebrityController');
const { requireAdmin } = require('../middleware/auth');

router.route('/')
  .get(celebrityController.getAll)
  .post(requireAdmin, celebrityController.create);

router.route('/:id')
  .get(celebrityController.getById)
  .put(requireAdmin, celebrityController.update)
  .delete(requireAdmin, celebrityController.deleteOne);

module.exports = router;
