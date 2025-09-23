import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { setLogout } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state?.user?.token);

  const [dropdownMenu, setDropDown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Delete account handler
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user?.user?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete account");

      // Success
      dispatch(setLogout());
      toast.success("Account deleted successfully 🗑️");
      setShowDeleteModal(false);
      navigate("/register", { replace: true });
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(error.message || "Unable to delete account");
    }
  };

  return (
    <div className="py-[10px] sm:py-[10px] px-[20px] sm:px-[60px] flex justify-between items-center relative">
      <Link to={"/"}>
        <h1 className="text-slate-600 text-3xl font-bold ">
          Rent
          <span className="text-slate-900">Nest</span>
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="flex border border-gray-500 rounded-[30px] h-[50px] px-5 gap-10 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim() !== "") {
              navigate(`/listings/search/${search}`);
            }
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            disabled={search.trim() === ""}
            className="cursor-pointer"
          >
            <FaSearch className="text-slate-600 w-6 h-6" />
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {user ? (
          <Link
            to={"/create-listing"}
            className="hidden sm:block no-underline text-slate-500 font-bold cursor-pointer hover:text-blue-500"
          >
            Become A Host
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="hidden sm:block no-underline text-slate-500 font-bold cursor-pointer hover:text-blue-500"
          >
            Become A Host
          </Link>
        )}

        <button
          onClick={() => setDropDown(!dropdownMenu)}
          className="h-[50px] flex items-center px-[10px] border border-gray-500 rounded-[30px] gap-2.5 bg-white cursor-pointer hover:shadow-lg"
        >
          <IoMdMenu className="text-slate-600" />

          {!user.user ? (
            <FaUser className="text-slate-600" />
          ) : (
            <img
              src={user?.user?.profileImagePath} // Cloudinary URL
              alt="profile photo"
              className="w-10 h-10 object-cover rounded-full "
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {dropdownMenu && !user.user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link to={"/login"}>Log In</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user?.user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link
              to={`/${user?.user?._id}/trips`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Trip List
            </Link>
            <Link
              to={`/${user?.user?._id}/wishlist`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Wish List
            </Link>
            <Link
              to={`/${user?.user?._id}/properties`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Property List
            </Link>
            <Link
              to={`/${user?.user?._id}/reservations`}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
            >
              Reservation List
            </Link>

            {/* Log Out */}
            <Link
              to={"/login"}
              className="w-full px-4 py-2 text-slate-500 no-underline font-bold hover:text-blue-500"
              onClick={() => {
                dispatch(setLogout());
                toast.success("Logged out successfully ✅");
              }}
            >
              Log Out
            </Link>

            {/* Delete Account */}
            <button
              className="w-full px-4 py-2 text-red-600 font-bold hover:text-red-800 text-left"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-slate-700 mb-4">
              Confirm Account Deletion
            </h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
