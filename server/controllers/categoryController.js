const Category = require('../models/Category');
const { getRedisClient } = require('../config/redis');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cachedCategories = await redisClient.get('categories');
    
    if (cachedCategories) {
      return res.json(JSON.parse(cachedCategories));
    }

    const categories = await Category.find().sort({ order: 1 });
    await redisClient.setEx('categories', 3600, JSON.stringify(categories)); // Cache for 1 hour
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { title, showInHomePage, order } = req.body;
    const category = new Category({ title, showInHomePage, order });
    const savedCategory = await category.save();
    
    // Invalidate cache
    const redisClient = getRedisClient();
    await redisClient.del('categories');
    
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
