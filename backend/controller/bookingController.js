import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

export const createBooking = async (req, res, next) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;

    // Prevent booking own property
    if (customerId === hostId) {
      return res
        .status(400)
        .json({ message: "You cannot book your own property." });
    }

    // Convert dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for overlapping bookings on the same listing
    const overlappingBooking = await Booking.findOne({
      listingId,
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "This listing is already booked for the selected dates.",
      });
    }

    // Create new booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    await newBooking.save();

    // Push booking reference into user's tripList and host's reservationList
    await User.findByIdAndUpdate(customerId, {
      $push: { tripList: newBooking._id },
    });

    await User.findByIdAndUpdate(hostId, {
      $push: { reservationList: newBooking._id },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
