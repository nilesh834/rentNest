import express from "express";
import multer from "multer";
import { login, register } from "../controller/authController.js";

const router = express.Router();

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const shortName = Math.random().toString(36).substring(2, 8);
    cb(null, shortName + "." + ext);
  },
});
const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

export default router;
