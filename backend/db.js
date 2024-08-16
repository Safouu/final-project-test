import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connect() {
  try {
    if (!process.env.DB_HOST) {
      throw new Error("Error: DB_HOST not defined!");
    }
    await mongoose.connect(process.env.DB_HOST);
  } catch (e) {
    console.error(e);
  }
}