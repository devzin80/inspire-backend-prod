const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbURI = process.env.MONGODB_URI ;
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}   

exports.connectDB = connectDB;