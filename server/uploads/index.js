const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/documents', documentRoutes);

mongoose.connect(process.env.MONGO_URI, () =>
  console.log('MongoDB connected')
);

app.listen(5000, () => console.log('Server started on port 5000'));
