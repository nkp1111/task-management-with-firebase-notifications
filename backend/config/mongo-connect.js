const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/task_manager";

exports.connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl)
    console.log("Mongo db connected...");
  } catch (error) {
    console.log("Error connecting Mongo db...", error);
    throw error;
  }
}
