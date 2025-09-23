import express from "express";
import { createBooking } from "../controller/bookingController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create booking
router.post("/create", verifyToken, createBooking);

export default router;
