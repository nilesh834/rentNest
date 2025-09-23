import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const CLOUDINARY = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const JWT_SECRET = process.env.JWT_SECRET; 
