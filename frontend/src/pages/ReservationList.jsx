import React from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setReservationList } from "../redux/slice/userSlice";

const ReservationList = () => {
  const user = useSelector((state) => state?.user?.user);

  const reservationList = useSelector(
    (state) => state?.user?.user?.reservationList
  );

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${user._id}/reservations`,
        { method: "GET" }
      );

      const data = await response.json();

      dispatch(setReservationList(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Reservation List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {reservationList?.length > 0 ? (
          reservationList.map((reservation) => (
            <ListingCard
              key={reservation._id} // booking id
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
