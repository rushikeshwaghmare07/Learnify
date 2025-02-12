const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\nMongoDB connected successfully!! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
