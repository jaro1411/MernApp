const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const documentRoutes = require('./routes/documents');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/user', userRoutes);

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, '../frontend/dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname1, '../frontend/dist', 'index.html'));
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () =>
      console.log('✅ Connected to DB & running on port', process.env.PORT)
    );
  })
  .catch((error) => console.error(error.message));
