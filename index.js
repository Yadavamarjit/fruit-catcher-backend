// app.js
import express from "express";
import { config } from "./config.js";
import { connectToMongoDB } from "./connect.js";
import { userRoute } from "./routes/userRoutes.js";
import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRoute);
connectToMongoDB()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
// Start server
const PORT = config.port || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

// config.js
// export const config = {
//   port: process.env.PORT || 3000,
// };
