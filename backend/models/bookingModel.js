import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },

    // Use Date instead of String for better querying
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
