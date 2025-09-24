import express from "express";
import {
  createListing,
  getListingDetails,
  getListings,
  getListingsBySearch,
} from "../controller/listingController.js";

import { upload } from "../utils/cloudinary.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create listing with multiple images upload to Cloudinary
router.post(
  "/create",
  verifyToken,
  upload.array("listingPhotos", 10),
  createListing
);

// Get all listings (optionally by category)
router.get("/", getListings);

// Search listings
router.get("/search/:search", getListingsBySearch);

// Get single listing
router.get("/:listingId", getListingDetails);

export default router;
