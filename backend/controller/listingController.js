import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      price,
    } = req.body;

    // Parse amenities JSON safely
    let amenitiesArray = [];
    try {
      amenitiesArray = amenities ? JSON.parse(amenities) : [];
    } catch (err) {
      return next(errorHandler(400, "Invalid amenities format"));
    }

    // Cloudinary URLs from multer-storage-cloudinary
    const listingPhotos = req.files;
    if (!listingPhotos || listingPhotos.length === 0) {
      return next(errorHandler(400, "No listing images uploaded"));
    }

    // file.path -> url, file.filename -> public_id (typical)
    const listingPhotoPaths = listingPhotos.map((file) => file.path);
    const listingPhotoPublicIds = listingPhotos.map(
      (file) => file.filename || ""
    );

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      state,
      country,
      guestCount: Number(guestCount),
      bedroomCount: Number(bedroomCount),
      bedCount: Number(bedCount),
      bathroomCount: Number(bathroomCount),
      amenities: amenitiesArray,
      listingPhotoPaths,
      listingPhotoPublicIds,
      title,
      description,
      price: Number(price),
    });

    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    next(error);
  }
};

// Get all listings
export const getListings = async (req, res, next) => {
  const qCategory = req.query.category;

  try {
    let listings;

    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getListingDetails = async (req, res, next) => {
  try {
    const { listingId } = req.params;

    const listing = await Listing.findById(listingId).populate("creator");

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListingsBySearch = async (req, res, next) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { state: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
