import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profileImagePath: {
      type: String,
      default: "",
    }, // Cloudinary URL

    profileImagePublicId: {
      type: String,
      default: "",
    },

    // Reference optimization
    tripList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],

    propertyList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],

    reservationList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
