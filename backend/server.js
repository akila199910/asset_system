import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

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

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key", // Replace with a secure key
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 } // Configure for production accordingly
}));


app.use("/api/v1", mainRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
