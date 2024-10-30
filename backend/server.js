import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import mainRouter from "./routes/router.js";
import { authenticateToken } from "./middleware/authenticateToken.js";

dotenv.config();
const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

app.use("/api/v1", mainRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
