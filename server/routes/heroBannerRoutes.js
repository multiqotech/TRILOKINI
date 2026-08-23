const express = require('express');
const router = express.Router();
const heroBannerController = require('../controllers/heroBannerController');

router.get('/active', heroBannerController.getActiveBanners);
router.put('/reorder', heroBannerController.reorder);

router.route('/')
  .get(heroBannerController.getAll)
  .post(heroBannerController.create);

router.route('/:id')
  .get(heroBannerController.getById)
  .put(heroBannerController.update)
  .delete(heroBannerController.deleteOne);

module.exports = router;
