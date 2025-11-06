import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global type for TypeScript
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cache
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  // Return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection with optimized settings
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering in serverless
      maxPoolSize: 10, // Limit connection pool size
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully!");
        return mongoose;
      })
      .catch((error) => {
        cached.promise = null; // Reset on failure to allow retry
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
