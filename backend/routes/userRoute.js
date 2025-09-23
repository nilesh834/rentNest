import express from "express";
import {
  addListingToWishList,
  getPropertyList,
  getReservationList,
  getTripList,
  deleteAccount,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Trips
router.get("/:userId/trips", verifyToken, getTripList);

// Wishlist (PATCH toggle)
router.patch("/:userId/:listingId", verifyToken, addListingToWishList);

// Property list
router.get("/:userId/properties", verifyToken, getPropertyList);

// Reservations
router.get("/:userId/reservations", verifyToken, getReservationList);

// DELETE account (protected)
router.delete("/:userId", verifyToken, deleteAccount);

export default router;
