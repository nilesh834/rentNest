import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const ReservationList = () => {
  const user = useSelector((state) => state?.user?.user);
  const token = useSelector((state) => state?.user?.token);
  const reservationList = user?.reservationList || [];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getReservationList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user._id}/reservations`,
        {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reservations");
      }

      dispatch(setReservationList(data));
    } catch (error) {
      console.error("Reservation list error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id && token) {
      getReservationList();
    }
  }, [user?._id, token]);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Reservation List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {loading ? (
          <p className="text-lg text-slate-600 font-medium">Loading...</p>
        ) : reservationList?.length > 0 ? (
          reservationList.map((reservation) => (
            <ListingCard
              key={reservation._id}
              listingId={reservation.listingId?._id}
              creator={reservation.listingId?.creator}
              listingPhotoPaths={reservation.listingId?.listingPhotoPaths}
              city={reservation.listingId?.city}
              state={reservation.listingId?.state}
              country={reservation.listingId?.country}
              category={reservation.listingId?.category}
              type={reservation.listingId?.type}
              price={reservation.listingId?.price}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              totalPrice={reservation.totalPrice}
              booking={true}
            />
          ))
        ) : (
          <p className="text-lg text-slate-600 font-medium">
            No bookings here yet 🗓️
          </p>
        )}
      </div>
    </>
  );
};

export default ReservationList;
