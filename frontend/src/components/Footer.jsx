import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const userId = useSelector((state) => state?.user?.user?._id);

  return (
    <footer className="bg-gray-300 text-slate-700 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Branding */}
        <p className="text-sm font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold">RentNest</span>. All rights reserved.
        </p>

        {/* Center: Quick links */}
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <Link
            to="/create-listing"
            className="hover:text-slate-900 transition-colors"
          >
            Host
          </Link>
          {userId && (
            <>
              <Link
                to={`/${userId}/trips`}
                className="hover:text-slate-900 transition-colors"
              >
                Trips
              </Link>
              <Link
                to={`/${userId}/wishlist`}
                className="hover:text-slate-900 transition-colors"
              >
                Wishlist
              </Link>
            </>
          )}
        </div>

        {/* Right: Tagline */}
        <p className="text-sm italic text-slate-600">
          Made with ❤️ to feel at home, wherever you are.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
