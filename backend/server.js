import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mainRouter from "./routes/router.js";

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/v1', mainRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));