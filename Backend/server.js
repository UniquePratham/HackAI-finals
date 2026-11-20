import mongoose from "mongoose";
import express from 'express';

const app = express();

const connectDatabase = async () => {
  try {
    const link = process.env.MONGODB_URI;
    await mongoose.connect(link);
    console.log(`MongoDB connected with server: HackAI`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

connectDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
