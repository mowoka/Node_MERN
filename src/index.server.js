const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

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

app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
