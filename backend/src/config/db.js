import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  try {
    if (!uri) {
      throw new Error("Set MONGO_URI or MONGODB_URI in .env");
    }

    await mongoose.connect(uri);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;


