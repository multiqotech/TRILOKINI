const Category = require('../models/Category');
const createCrudController = require('../utils/crudFactory');
const { getRedisClient } = require('../config/redis');

const crud = createCrudController(Category, 'categories');

const getHomepageCategories = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'categories:homepage';
    
    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
    
    const categories = await Category.find({ showInHomePage: true }).sort({ homePageOrder: 1 });
    
    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories));
    }
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBulkShowCategories = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'categories:bulkshow';

    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }

    const categories = await Category.find({ bulkShow: true, isActive: true }).sort({ homePageOrder: 1, order: 1 });

    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories));
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ...crud,
  getHomepageCategories,
  getBulkShowCategories,
};
