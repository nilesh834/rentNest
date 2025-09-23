import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/slice/listingSlice";
import toast from "react-hot-toast";

const SearchPage = () => {
  const { search } = useParams();

  const listings = useSelector((state) => state?.listings?.listings) || [];
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getSearchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/search/${search}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      getSearchListings();
    }
  }, [search]);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Search results for: {search}
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {loading ? (
          <p className="text-lg text-slate-600 font-medium">
            Loading search results...
          </p>
        ) : listings?.length > 0 ? (
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
          <p className="text-lg text-slate-600 font-medium">No Results Found</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
