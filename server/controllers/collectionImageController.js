const CollectionImage = require('../models/CollectionImage');
const createCrudController = require('../utils/crudFactory');
const { getRedisClient } = require('../config/redis');

const crud = createCrudController(CollectionImage, 'collectionimages');

const ensureUniqueCollectionPosition = async ({ collection, position, excludeId = null }) => {
  const existing = await CollectionImage.findOne({
    collection,
    position,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  });

  if (existing) {
    const error = new Error('A collection image already exists for this position. Please choose a different slot.');
    error.statusCode = 409;
    throw error;
  }
};

const clearRelatedCache = async () => {
  const redisClient = getRedisClient();
  if (!redisClient) return;
  const keys = [
    ...(await redisClient.keys('collectionimages:*')),
    ...(await redisClient.keys('collections:*')),
  ];
  for (const key of keys) {
    await redisClient.del(key);
  }
};

const getAll = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    const cacheKey = 'collectionimages:all';

    if (redisClient) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }

    const data = await CollectionImage.find()
      .populate('collection', 'title order')
      .sort({ createdAt: -1 });

    if (redisClient) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    await ensureUniqueCollectionPosition({
      collection: req.body.collection,
      position: Number(req.body.position),
    });

    const savedData = await new CollectionImage(req.body).save();
    await clearRelatedCache();
    const populated = await CollectionImage.findById(savedData._id).populate('collection', 'title order');
    res.status(201).json(populated);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const position = Number(req.body.position);
    const collection = req.body.collection ?? (await CollectionImage.findById(req.params.id).select('collection').lean())?.collection;

    await ensureUniqueCollectionPosition({
      collection,
      position,
      excludeId: req.params.id,
    });

    const updatedData = await CollectionImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('collection', 'title order');

    if (!updatedData) {
      return res.status(404).json({ message: 'collectionimages not found' });
    }

    await clearRelatedCache();
    res.status(200).json(updatedData);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const deletedData = await CollectionImage.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'collectionimages not found' });
    }
    await clearRelatedCache();
    res.status(200).json({ message: 'collectionimages deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ...crud,
  getAll,
  create,
  update,
  deleteOne,
};
