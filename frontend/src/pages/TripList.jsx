import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/slice/userSlice";
import ListingCard from "../components/ListingCard";

const TripList = () => {
  const userId = useSelector((state) => state?.user?.user?._id);
  // console.log(userId);

  const tripList = useSelector((state) => state?.user?.user?.tripList);

  //  console.log(tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/trips`,
        { method: "GET" }
      );

      const data = await response.json();

      dispatch(setTripList(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Trip List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        
        {tripList?.length > 0 ? (
          tripList.map((trip) => (
            <ListingCard
              key={trip._id} // booking id is unique
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
