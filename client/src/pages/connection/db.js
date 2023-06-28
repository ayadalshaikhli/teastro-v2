const mongoose = require('mongoose');

// Read the environment variables
const { MONG_URI, DB_NAME } = process.env;

// Connect to MongoDB
mongoose.connect(MONG_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
