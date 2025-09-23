import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import { MONGO_URI, PORT, CLIENT_URL } from "./config.js";

import authRoutes from "./routes/authRoute.js";
import listingRoutes from "./routes/listingRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";
import userRoutes from "./routes/userRoute.js";

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("❌ Error:", message); // log in backend

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
