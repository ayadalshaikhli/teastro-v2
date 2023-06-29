const mongoose = require('mongoose');
require("dotenv").config();

const MURL = process.env.MONG_URI;
const DBNAME = process.env.DB_NAME;

mongoose.connect( MURL + DBNAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
