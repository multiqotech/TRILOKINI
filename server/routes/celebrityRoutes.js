const express = require('express');
const router = express.Router();
const celebrityController = require('../controllers/celebrityController');

router.route('/')
  .get(celebrityController.getAll)
  .post(celebrityController.create);

router.route('/:id')
  .get(celebrityController.getById)
  .put(celebrityController.update)
  .delete(celebrityController.deleteOne);

module.exports = router;
