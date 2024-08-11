import mongoose from "mongoose";
import { config } from "./config.js";

export function connectToMongoDB() {
  return mongoose.connect(config.mongoUrl);
}
