import mongoose from "mongoose";

const uri = process.env.MONGODB_CONNECTION_STRING as string;

if (!uri) throw new Error("Database connection not configured!");

export async function connect() {
  return await mongoose.connect(uri);
}
