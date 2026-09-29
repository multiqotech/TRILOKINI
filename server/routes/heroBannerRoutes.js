const express = require('express');
const router = express.Router();
const heroBannerController = require('../controllers/heroBannerController');
const { requireAdmin } = require('../middleware/auth');

router.get('/active', heroBannerController.getActiveBanners);
router.put('/reorder', requireAdmin, heroBannerController.reorder);

router.route('/')
  .get(heroBannerController.getAll)
  .post(requireAdmin, heroBannerController.create);

router.route('/:id')
  .get(heroBannerController.getById)
  .put(requireAdmin, heroBannerController.update)
  .delete(requireAdmin, heroBannerController.deleteOne);

module.exports = router;
