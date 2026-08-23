const HeroBanner = require('../models/HeroBanner');
const createCrudController = require('../utils/crudFactory');
const { getRedisClient } = require('../config/redis');

const crud = createCrudController(HeroBanner, 'herobanners');

const getActiveBanners = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'herobanners:active';
    
    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
    
    const banners = await HeroBanner.find({ isActive: true }).sort({ order: 1 });
    
    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(banners));
    }
    
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reorder = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    
    await Promise.all(
      items.map((item) => 
        HeroBanner.findByIdAndUpdate(item.id, { order: item.order })
      )
    );
    
    const redisClient = getRedisClient();
    if (redisClient) {
      const keys = await redisClient.keys('herobanners:*');
      for (let key of keys) {
        await redisClient.del(key);
      }
    }
    
    res.status(200).json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ...crud,
  getActiveBanners,
  reorder,
};
