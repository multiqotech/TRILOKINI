require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running normally' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const startServer = async () => {
  await connectDB();
  await connectRedis();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
