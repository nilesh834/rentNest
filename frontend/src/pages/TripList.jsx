import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/slice/userSlice";
import ListingCard from "../components/ListingCard";
import toast from "react-hot-toast";

const TripList = () => {
  const userId = useSelector((state) => state?.user?.user?._id);
  const token = useSelector((state) => state?.user?.token);
  const tripList = useSelector((state) => state?.user?.user?.tripList) || [];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getTripList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}/trips`,
        {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch trip list");
      }

      dispatch(setTripList(data));
    } catch (error) {
      console.error("Trip list error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getTripList();
    }
  }, [userId, token]);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Trip List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {loading ? (
          <p className="text-lg text-slate-600 font-medium">Loading...</p>
        ) : tripList?.length > 0 ? (
          tripList.map((trip) => (
            <ListingCard
              key={trip._id}
              listingId={trip.listingId?._id}
              creator={trip.listingId?.creator}
              listingPhotoPaths={trip.listingId?.listingPhotoPaths}
              city={trip.listingId?.city}
              state={trip.listingId?.state}
              country={trip.listingId?.country}
              category={trip.listingId?.category}
              type={trip.listingId?.type}
              price={trip.listingId?.price}
              startDate={trip.startDate}
              endDate={trip.endDate}
              totalPrice={trip.totalPrice}
              booking={true}
            />
          ))
        ) : (
          <p className="text-lg text-slate-600 font-medium">
            Start planning your next trip!
          </p>
        )}
      </div>
    </>
  );
};

export default TripList;
