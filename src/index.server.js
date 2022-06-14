const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

env.config();

// monggo connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_DB}:${process.env.MONGO_PASSWORD_DB}@cluster-flip-db.jpxih.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database connected');
  });

  
app.use(bodyParser());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
