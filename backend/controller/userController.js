import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import Booking from "../models/bookingModel.js";
import { cloudinary } from "../utils/cloudinary.js";

//Delete account and cleanup
export const deleteAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Authorization check
    if (req.userId !== userId) {
      return next(errorHandler(403, "Unauthorized access"));
    }

    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, "User not found"));

    // Delete profile image
    if (user.profileImagePublicId) {
      try {
        await cloudinary.uploader.destroy(user.profileImagePublicId, { resource_type: "image" });
      } catch (err) {
        console.error("Profile image cleanup failed:", err.message);
      }
    }

    // Collect listings
    const listings = await Listing.find({ creator: userId }).lean();
    const listingIds = listings.map((l) => l._id);
    const listingPhotoPublicIds = listings.flatMap((l) => l.listingPhotoPublicIds || []);

    // Delete listing images
    if (listingPhotoPublicIds.length > 0) {
      await Promise.all(
        listingPhotoPublicIds.map((pid) =>
          cloudinary.uploader.destroy(pid, { resource_type: "image" }).catch(() => null)
        )
      );
    }

    // Find related bookings
    const bookings = await Booking.find({
      $or: [
        { listingId: { $in: listingIds.length ? listingIds : ["__no"] } },
        { customerId: userId },
        { hostId: userId },
      ],
    }).lean();
    const bookingIds = bookings.map((b) => b._id);

    // Remove references from all users
    if (bookingIds.length > 0) {
      await User.updateMany({}, { $pull: { tripList: { $in: bookingIds }, reservationList: { $in: bookingIds } } });
    }
    if (listingIds.length > 0) {
      await User.updateMany({}, { $pull: { wishList: { $in: listingIds }, propertyList: { $in: listingIds } } });
    }

    // Delete related docs
    if (bookingIds.length > 0) await Booking.deleteMany({ _id: { $in: bookingIds } });
    if (listingIds.length > 0) await Listing.deleteMany({ _id: { $in: listingIds } });

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "Account and all related data deleted successfully" });
  } catch (error) {
    next(error);
  }
};


// Get trip list (populate tripList -> Booking -> Listing)
export const getTripList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: "tripList",
      populate: [
        { path: "listingId", populate: { path: "creator" } },
        { path: "customerId" },
        { path: "hostId" },
      ],
    });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user.tripList);
  } catch (error) {
    next(error);
  }
};

// Wishlist toggle stays the same
export const addListingToWishList = async (req, res, next) => {
  try {
    const { userId, listingId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId).populate("creator");
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    // Check if already in wishlist
    const favoriteListing = user.wishList.find(
      (item) => item.toString() === listingId
    );

    if (favoriteListing) {
      // Remove listingId
      user.wishList = user.wishList.filter(
        (item) => item.toString() !== listingId
      );
      await user.save();

      // Repopulate wishlist after removal
      const updatedUser = await User.findById(userId).populate({
        path: "wishList",
        populate: { path: "creator" },
      });

      return res.status(200).json({
        message: "Listing removed from wishlist",
        wishList: updatedUser.wishList,
      });
    } else {
      // Add listingId
      user.wishList.push(listingId);
      await user.save();

      // Repopulate wishlist after addition
      const updatedUser = await User.findById(userId).populate({
        path: "wishList",
        populate: { path: "creator" },
      });

      return res.status(200).json({
        message: "Listing added to wishlist",
        wishList: updatedUser.wishList,
      });
    }
  } catch (error) {
    next(error);
  }
};


// Get property list (unchanged, still based on Listing)
export const getPropertyList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// Get reservation list (populate reservationList -> Booking -> Listing)
export const getReservationList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: "reservationList",
      populate: [
        { path: "listingId", populate: { path: "creator" } },
        { path: "customerId" },
        { path: "hostId" },
      ],
    });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user.reservationList);
  } catch (error) {
    next(error);
  }
};
