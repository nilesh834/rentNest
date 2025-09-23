import React from "react";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useSelector } from "react-redux";

const WishList = () => {
  const wishList = useSelector((state) => state?.user?.user?.wishList) || [];

  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Wish List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {wishList?.length > 0 ? (
          wishList.map(
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
            Oops! Your wishlist is still empty
          </p>
        )}
      </div>
    </>
  );
};

export default WishList;
