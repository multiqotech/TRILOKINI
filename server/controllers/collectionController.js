const Collection = require('../models/Collection');
const CollectionImage = require('../models/CollectionImage');
const createCrudController = require('../utils/crudFactory');
const { getRedisClient } = require('../config/redis');

const crud = createCrudController(Collection, 'collections');

const getAll = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'collections:all';

    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.status(200).json(parsed);
        }
      }
    }

    const data = await Collection.find().sort({ order: 1, createdAt: 1 });

    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActive = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'collections:active';

    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.status(200).json(parsed);
        }
      }
    }

    const collections = await Collection.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    const collectionIds = collections.map((c) => c._id);
    const images = await CollectionImage.find({
      collection: { $in: collectionIds },
      isActive: true,
    }).sort({ position: 1 });

    const imagesByCollection = images.reduce((acc, image) => {
      const key = image.collection.toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(image);
      return acc;
    }, {});

    const result = collections.map((collection) => ({
      ...collection.toObject(),
      images: imagesByCollection[collection._id.toString()] || [],
    }));

    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Collection.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: 'collections not found' });
    }

    await CollectionImage.deleteMany({ collection: id });

    const redisClient = getRedisClient();
    if (redisClient) {
      const keys = await redisClient.keys('collections:*');
      const imageKeys = await redisClient.keys('collectionimages:*');
      for (const key of [...keys, ...imageKeys]) {
        await redisClient.del(key);
      }
    }

    res.status(200).json({ message: 'collections deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ...crud,
  getAll,
  getActive,
  deleteOne,
};
