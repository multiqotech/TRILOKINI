require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const { getRedisClient } = require('../config/redis');
const Collection = require('../models/Collection');
const CollectionImage = require('../models/CollectionImage');

const images = {
  heritageHues: '/images/collections/heritage-hues.png',
  istya: '/images/collections/istya.png',
  guest: '/images/collections/best-dressed-guest.png',
  sunlit: '/images/collections/sunlit-celebrations.png',
  evening: '/images/collections/evening-glamour.png',
  drapes: '/images/collections/heritage-drapes.png',
  bridesmaid: '/images/collections/bridesmaid-edit.png',
};

const seedCollections = [
  {
    title: 'COLLECTION 1',
    order: 1,
    imageUrls: [
      images.heritageHues,
      images.sunlit,
      images.evening,
      images.drapes,
      images.bridesmaid,
      images.heritageHues,
    ],
  },
  {
    title: 'COLLECTION 2',
    order: 2,
    imageUrls: [
      images.heritageHues,
      images.istya,
      images.guest,
      images.istya,
      images.guest,
      images.heritageHues,
    ],
  },
];

const clearCollectionCache = async () => {
  const redisClient = getRedisClient();
  if (!redisClient) return;

  const keys = [
    ...(await redisClient.keys('collections:*')),
    ...(await redisClient.keys('collectionimages:*')),
  ];

  for (const key of keys) {
    await redisClient.del(key);
  }
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await CollectionImage.deleteMany({});
  await Collection.deleteMany({});
  await clearCollectionCache();

  for (const item of seedCollections) {
    const collection = await Collection.create({
      title: item.title,
      order: item.order,
      isActive: true,
    });

    await CollectionImage.insertMany(
      item.imageUrls.map((imageUrl, index) => ({
        collection: collection._id,
        imageUrl,
        position: index + 1,
        isActive: true,
      }))
    );
  }

  await clearCollectionCache();

  console.log(`Seeded ${seedCollections.length} collections with 6 images each from ${path.basename(__filename)}`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
