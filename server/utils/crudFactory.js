const { getRedisClient } = require('../config/redis');

const createCrudController = (Model, modelName) => {
  return {
    getAll: async (req, res) => {
      try {
        const redisClient = getRedisClient();
        const cacheKey = `${modelName}:all`;
        
        if (redisClient) {
          const cachedData = await redisClient.get(cacheKey);
          if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
          }
        }
        
        const data = await Model.find();
        
        if (redisClient) {
          await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
        }
        
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    
    getById: async (req, res) => {
      try {
        const { id } = req.params;
        const redisClient = getRedisClient();
        const cacheKey = `${modelName}:${id}`;
        
        if (redisClient) {
          const cachedData = await redisClient.get(cacheKey);
          if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
          }
        }
        
        const data = await Model.findById(id);
        if (!data) {
          return res.status(404).json({ message: `${modelName} not found` });
        }
        
        if (redisClient) {
          await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
        }
        
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    
    create: async (req, res) => {
      try {
        const newData = new Model(req.body);
        const savedData = await newData.save();
        
        const redisClient = getRedisClient();
        if (redisClient) {
          const keys = await redisClient.keys(`${modelName}:*`);
          for (let key of keys) {
             await redisClient.del(key);
          }
        }
        
        res.status(201).json(savedData);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    
    update: async (req, res) => {
      try {
        const { id } = req.params;
        const updatedData = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updatedData) {
          return res.status(404).json({ message: `${modelName} not found` });
        }
        
        const redisClient = getRedisClient();
        if (redisClient) {
          const keys = await redisClient.keys(`${modelName}:*`);
          for (let key of keys) {
             await redisClient.del(key);
          }
        }
        
        res.status(200).json(updatedData);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    
    deleteOne: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedData = await Model.findByIdAndDelete(id);
        
        if (!deletedData) {
          return res.status(404).json({ message: `${modelName} not found` });
        }
        
        const redisClient = getRedisClient();
        if (redisClient) {
          const keys = await redisClient.keys(`${modelName}:*`);
          for (let key of keys) {
             await redisClient.del(key);
          }
        }
        
        res.status(200).json({ message: `${modelName} deleted successfully` });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  };
};

module.exports = createCrudController;
