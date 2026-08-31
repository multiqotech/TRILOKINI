require('dotenv').config();
const mongoose = require('mongoose');
const { getRedisClient } = require('../config/redis');
const Category = require('../models/Category');

const cloudinaryImages = {
  coralLehenga: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/hxwix2jbgfew6q2coh3l.jpg',
  pastelSaree: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/ia3c9hb4l1p0zvyw4pm9.jpg',
  emeraldSet: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/tnf7ybpppgs56dgz3j7v.jpg',
  powderGown: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/h9d5tsgbbdyj0omtg1zs.jpg',
  saffronEdit: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/cq7t1f2o0wo3lf4f7f4k.jpg',
  bridalLuxury: 'https://res.cloudinary.com/ddh5ynpqg/image/upload/v1787498188/trilokini_uploads/qtdn9o0l7f8g0m7o6c5r.jpg',
};

const categories = [
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.coralLehenga,
    showInHomePage: true,
    homePageOrder: 0,
    bulkShow: true,
    isActive: true,
    order: 1,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.pastelSaree,
    showInHomePage: true,
    homePageOrder: 1,
    bulkShow: true,
    isActive: true,
    order: 2,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.emeraldSet,
    showInHomePage: true,
    homePageOrder: 2,
    bulkShow: true,
    isActive: true,
    order: 3,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.powderGown,
    showInHomePage: true,
    homePageOrder: 3,
    bulkShow: true,
    isActive: true,
    order: 4,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.saffronEdit,
    showInHomePage: true,
    homePageOrder: 4,
    bulkShow: true,
    isActive: true,
    order: 5,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.bridalLuxury,
    showInHomePage: true,
    homePageOrder: 5,
    bulkShow: true,
    isActive: true,
    order: 6,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.coralLehenga,
    showInHomePage: true,
    homePageOrder: 6,
    bulkShow: true,
    isActive: true,
    order: 7,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.emeraldSet,
    showInHomePage: true,
    homePageOrder: 7,
    bulkShow: true,
    isActive: true,
    order: 8,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.bridalLuxury,
    showInHomePage: true,
    homePageOrder: 8,
    bulkShow: true,
    isActive: true,
    order: 9,
  },
  {
    title: 'NIDHIKA SHEKAR',
    description: 'SHOP NOW',
    imageUrl: cloudinaryImages.pastelSaree,
    showInHomePage: true,
    homePageOrder: 9,
    bulkShow: true,
    isActive: true,
    order: 10,
  },
];

const clearCategoryCache = async () => {
  const redisClient = getRedisClient();
  if (!redisClient) return;

  const keys = await redisClient.keys('categories:*');
  for (const key of keys) {
    await redisClient.del(key);
  }
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Category.deleteMany({});
  await Category.insertMany(categories);
  await clearCategoryCache();

  console.log(`Seeded ${categories.length} categories for bulk-show page.`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
