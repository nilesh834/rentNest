import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city,
  state,
  country,
  category,
  type,
  price,
  booking,
  startDate,
  endDate,
  totalPrice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user
  const userState = useSelector((state) => state?.user);
  const user = userState?.user;
  const token = userState?.token;

  // Carousel logic
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // Wishlist logic
  const wishList = user?.wishList || [];
  const isAddToWishList = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    if (user?._id === creator?._id) {
      toast.error("You cannot add your own listing to wishlist");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to update wishlist");

      dispatch(setWishList(data.wishList));
      toast.success(
        isAddToWishList ? "Removed from wishlist ❤️‍🩹" : "Added to wishlist ❤️"
      );
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error(error.message || "Unable to update wishlist");
    }
  };

  return (
    <div
      className="relative cursor-pointer p-2.5 rounded-lg hover:shadow-lg w-72"
      onClick={() => navigate(`/listings/${listingId}`)}
    >
      {/* Image carousel with fallback */}
      <div className="w-72 overflow-hidden rounded-lg mb-2.5">
        {listingPhotoPaths.length > 0 ? (
          <div
            className="flex w-full items-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {listingPhotoPaths.map((photo, index) => (
              <div
                className="relative flex-none w-full h-64 flex items-center"
                key={index}
              >
                <img
                  src={photo}
                  alt={`Listing photo ${index + 1}`}
                  className="w-full h-full brightness-90 object-cover"
                />

                {/* Prev button */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full cursor-pointer flex items-center justify-center bg-white/70 z-50 hover:bg-white left-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevSlide();
                  }}
                >
                  <FaArrowLeft className="text-[15px]" />
                </div>

                {/* Next button */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full cursor-pointer flex items-center justify-center bg-white/70 z-50 hover:bg-white right-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide();
                  }}
                >
                  <FaArrowRight className="text-[15px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-slate-500">No image available</p>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-slate-700">
        {city}, {state}, {country}
      </h3>

      <p className="text-base text-slate-700">{category}</p>
      {!booking ? (
        <>
          <p className="text-base text-slate-700">{type}</p>
          <p className="text-base text-slate-700">
            <span className="font-bold text-lg text-slate-700">₹{price}</span>{" "}
            per night
          </p>
        </>
      ) : (
        <>
          <p className="text-base text-slate-700">
            {new Date(startDate).toDateString()} -{" "}
            {new Date(endDate).toDateString()}
          </p>
          <p className="text-base text-slate-700">
            <span className="font-bold text-lg text-slate-700">
              ₹{totalPrice}
            </span>{" "}
            total
          </p>
        </>
      )}
      {/* Wishlist button (only show if not booking and not own listing) */}
      {!booking && user?._id !== creator?._id && (
        <button
          className={`absolute right-5 top-5 border-none text-2xl cursor-pointer z-[999] bg-none ${
            isAddToWishList ? "text-red-500" : "text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
        >
          <FaHeart />
        </button>
      )}
    </div>
  );
};

export default ListingCard;
