import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ListingDetails = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false); // used for both fetch + booking

  const getListingDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/${listingId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch listing details");
      }
      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong while loading listing"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  // Calendar
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const rawDayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const dayCount = rawDayCount > 0 ? rawDayCount : 1;

  // Redux state
  const customerId = useSelector((state) => state?.user?.user?._id);
  const token = useSelector((state) => state?.user?.token);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        // send in ISO format for backend parsing
        startDate: dateRange[0].startDate.toISOString(),
        endDate: dateRange[0].endDate.toISOString(),
        totalPrice: listing.price * dayCount,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // protected route
          },
          body: JSON.stringify(bookingForm),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create booking");

      toast.success("Booking confirmed 🎉");
      navigate(`/${customerId}/trips`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // unified loading check
  if (loading && !listing) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-20 text-slate-600">Loading listing...</p>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-20 text-slate-600">
          No listing found. Please try again later.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-5 py-10 lg:px-12">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-4">
          <h1 className="text-2xl font-bold text-slate-700">
            {listing?.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5 my-5">
          {listing?.listingPhotoPaths?.map((item, index) => (
            <img
              src={item}
              alt="listing photo"
              className="max-h-[280px] max-w-[280px] object-cover"
              key={index}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-700">
          {listing?.type} in {listing?.city}, {listing?.state},{" "}
          {listing?.country}
        </h2>

        <p className="max-w-[800px] mt-5 text-slate-700 ">
          {listing?.guestCount} guests - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathrooms(s)
        </p>
        <hr className="my-4 border-gray-300" />

        {/* Owner Profile */}
        <div className="flex gap-5 items-center">
          <img
            src={listing?.creator?.profileImagePath}
            alt="profile pic"
            className="w-[60px] h-[60px] m-0 rounded-full object-cover"
          />
          <h3 className="text-slate-700 font-semibold">
            Owned by {listing?.creator?.firstName} {listing?.creator?.lastName}
          </h3>
        </div>

        <hr className="my-4 border-gray-300" />

        <h3 className="text-xl font-bold text-slate-700">Description</h3>
        <p className="max-w-[800px] mt-5 text-slate-700">
          {listing?.description}
        </p>

        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col lg:flex-row justify-between lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-700">
              What kind of offers will provide
            </h2>
            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-24 my-7 max-w-[700px]">
              {listing?.amenities?.map((item, index) => (
                <div
                  className="flex items-center gap-5 text-lg font-semibold mb-5"
                  key={index}
                >
                  <div className="text-2xl text-slate-700">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p className="m-0 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xl font-bold text-slate-700">
            <h2>How long do you want to stay?</h2>

            <div className="my-7">
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                minDate={new Date()}
              />

              {dayCount > 1 ? (
                <h2 className="mb-2.5">
                  ₹{listing?.price} x {dayCount} nights
                </h2>
              ) : (
                <h2 className="mb-2.5">
                  ₹{listing?.price} x {dayCount} night
                </h2>
              )}

              <h2 className="font-bold text-slate-700 mb-2.5">
                Total price: ₹{listing?.price * dayCount}
                <p className="text-slate-700">
                  Start Date: {dateRange[0].startDate.toDateString()}
                </p>
                <p className="text-slate-700">
                  End Date: {dateRange[0].endDate.toDateString()}
                </p>
                {customerId === listing?.creator?._id ? (
                  <button
                    className="w-full mt-7 sm:max-w-[300px] text-white bg-gray-400 p-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Unavailable
                  </button>
                ) : (
                  <button
                    className="w-full mt-7 sm:max-w-[300px] text-white bg-slate-700 p-2 rounded-lg hover:opacity-95 uppercase"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Book Now"}
                  </button>
                )}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
