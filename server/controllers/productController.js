const Product = require('../models/Product');
const createCrudController = require('../utils/crudFactory');
const { getRedisClient } = require('../config/redis');

const crud = createCrudController(Product, 'products');

const getHomepageProducts = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'products:homepage';
    
    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
    
    const products = await Product.find({ showInHomePage: true, isActive: true })
      .populate('category', 'title showInHomePage')
      .sort({ homePageOrder: 1 });
      
    // Group by category, top 5 per category
    const grouped = products.reduce((acc, curr) => {
      const categoryId = curr.category?._id?.toString();
      if (!categoryId) return acc;
      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: curr.category,
          products: []
        };
      }
      
      if (acc[categoryId].products.length < 5) {
        acc[categoryId].products.push(curr);
      }
      return acc;
    }, {});
    
    const result = Object.values(grouped);
    
    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const redisClient = getRedisClient();
    const cacheKey = `products:category:${categoryId}`;
    
    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
    
    const products = await Product.find({ category: categoryId }).populate('category', 'title showInHomePage');
    
    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
    }
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBulkShowProducts = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'products:bulkshow';
    
    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }
    
    // First, find all categories with bulkShow: true
    const Category = require('../models/Category');
    const categories = await Category.find({ bulkShow: true, isActive: true }).sort({ homePageOrder: 1 });
    const categoryIds = categories.map(c => c._id);
    
    // Then find all active products for those categories
    const products = await Product.find({ category: { $in: categoryIds }, isActive: true })
      .populate('category', 'title bulkShow homePageOrder')
      .sort({ homePageOrder: 1 });
      
    // Group by category
    const grouped = products.reduce((acc, curr) => {
      const categoryId = curr.category?._id?.toString();
      if (!categoryId) return acc;
      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: curr.category,
          products: []
        };
      }
      
      // Add all products (no length limit for bulk show)
      acc[categoryId].products.push(curr);
      
      return acc;
    }, {});
    
    // Sort groups by category's homePageOrder
    const result = Object.values(grouped).sort((a, b) => 
      (a.category.homePageOrder || 0) - (b.category.homePageOrder || 0)
    );
    
    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ...crud,
  getHomepageProducts,
  getBulkShowProducts,
  getByCategory,
};
