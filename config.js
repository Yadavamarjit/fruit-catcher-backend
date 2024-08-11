import env from "dotenv";
env.config();
export const config = {
  mongoUrl: process.env.MONGO_URI,
  port: process.env.PORT,
};
