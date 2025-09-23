import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { CLOUDINARY } from "../config.js"; 

// Configure Cloudinary
cloudinary.config(CLOUDINARY);

// Multer storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rentNest", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image",
  },
});

// Middleware for uploads
const upload = multer({ storage });

export { cloudinary, upload };
