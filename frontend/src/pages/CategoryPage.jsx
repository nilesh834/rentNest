import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";
import { setListings } from "../redux/slice/listingSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);

  const listings = useSelector((state) => state?.listings?.listings) || [];
  const dispatch = useDispatch();

  const getListingsByCategory = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing?category=${category}`,
        { method: "GET" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch listings");

      dispatch(setListings({ listings: data }));
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error(error.message || "Something went wrong");
      dispatch(setListings({ listings: [] })); // reset on failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingsByCategory();
  }, [category]);

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12 uppercase">
        {category} Listings
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {loading ? (
          <p className="text-gray-500">Loading listings...</p>
        ) : listings.length > 0 ? (
          listings.map(
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
          <p className="text-gray-500">No listings found in this category.</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
