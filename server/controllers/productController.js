const Product = require('../models/Product');
const { getRedisClient } = require('../config/redis');

// Get all products (with optional category filter)
exports.getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let query = {};
    let cacheKey = 'products:all';
    
    if (categoryId) {
      query.category = categoryId;
      cacheKey = `products:category:${categoryId}`;
    }

    const redisClient = getRedisClient();
    const cachedProducts = await redisClient.get(cacheKey);
    
    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find(query).populate('category', 'title showInHomePage');
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    // Invalidate cache
    const redisClient = getRedisClient();
    await redisClient.del('products:all');
    await redisClient.del(`products:category:${productData.category}`);
    
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
