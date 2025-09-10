import React, { useEffect, useState } from "react";
import { categories } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/slice/listingSlice";
import ListingCard from "./ListingCard";

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state?.listings?.listings) || []; // ✅ fallback

  const dispatch = useDispatch();

  const getListings = async () => {
    try {
      const res = await fetch(
        selectedCategory !== "All"
          ? `${
              import.meta.env.VITE_API_URL
            }/api/listing?category=${selectedCategory}`
          : `${import.meta.env.VITE_API_URL}/api/listing`
      );

      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();
      dispatch(setListings({ listings: data }));
    } catch (error) {
      console.error("Error fetching listings:", error);
      dispatch(setListings({ listings: [] })); //  prevent crash
    }
  };

  useEffect(() => {
    getListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="px-20 py-12 md:px-5 flex justify-center flex-wrap gap-14">
        {Array.isArray(categories) &&
          categories.map((category) => (
            <div
              className={`flex flex-col items-center text-slate-900 cursor-pointer`}
              key={category.label}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div
                className={`text-2xl ${
                  category.label === selectedCategory ? "text-red-500" : ""
                }`}
              >
                {category.icon}
              </div>
              <p
                className={`text-lg font-bold ${
                  category.label === selectedCategory ? "text-red-500" : ""
                }`}
              >
                {category.label}
              </p>
            </div>
          ))}
      </div>

      <div className="px-12 pb-32 lg:px-5 flex flex-wrap justify-center gap-5">
        {listings.length > 0 ? (
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
          <p>No listings found.</p> // fallback
        )}
      </div>
    </>
  );
};

export default Listings;
