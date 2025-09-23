import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // multer + cloudinary automatically upload
    if (!req.file) {
      return res.status(400).send("No profile image uploaded");
    }

    // Cloudinary storage (multer-storage-cloudinary) typically provides:
    // req.file.path -> url, req.file.filename -> public_id
    const profileImagePath = req.file.path || "";
    const profileImagePublicId = req.file.filename || "";

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exist!"));
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
      profileImagePublicId,
    });

    await newUser.save();

    // Fetch the newly created user with populated refs
    const populatedUser = await User.findById(newUser._id)
      .populate("wishList")
      .populate("tripList")
      .populate("propertyList")
      .populate("reservationList");

    const { password: pass, ...user } = populatedUser._doc;

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email })
      .populate("wishList")
      .populate("tripList")
      .populate("propertyList")
      .populate("reservationList");
      
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"));
    }

    const expiresIn = 3600; // 1 hour

    // use JWT_SECRET from config.js
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET, {
      expiresIn,
    });

    const { password: pass, ...user } = validUser._doc;

    res.status(200).json({ token, expiresIn, user });
  } catch (error) {
    next(error);
  }
};
