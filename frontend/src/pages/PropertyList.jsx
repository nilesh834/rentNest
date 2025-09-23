import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const PropertyList = () => {
  const user = useSelector((state) => state?.user?.user);
  const token = useSelector((state) => state?.user?.token);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getPropertyList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user._id}/properties`,
        {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch property list");
      }

      dispatch(setPropertyList(data));
    } catch (error) {
      console.error("Property list error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id && token) {
      getPropertyList();
    }
  }, [user?._id, token]);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Property List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {loading ? (
          <p className="text-lg text-slate-600 font-medium">Loading...</p>
        ) : propertyList?.length > 0 ? (
          propertyList.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              state,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                state={state}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        ) : (
          <p className="text-lg text-slate-600 font-medium">
            No homes added yet
          </p>
        )}
      </div>
    </>
  );
};

export default PropertyList;
