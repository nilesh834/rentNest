import express from "express";
import { login, register } from "../controller/authController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// Register with profile image upload to Cloudinary
router.post("/register", upload.single("profileImage"), register);

// Login (no image upload)
router.post("/login", login);

export default router;
