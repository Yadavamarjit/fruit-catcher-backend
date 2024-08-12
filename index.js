// app.js
import express from "express";
import { config } from "./config.js";
import { connectToMongoDB } from "./connect.js";
import { userRoute } from "./routes/userRoutes.js";
import cors from "cors";
const app = express();

const allowedOrigin = "https://fruits-catcher.netlify.app";

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
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
