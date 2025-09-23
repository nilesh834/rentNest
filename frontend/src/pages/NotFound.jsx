import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-slate-700">404</h1>
      <p className="text-lg text-slate-500 mt-4">Page not found</p>

      <div className="flex gap-4 mt-6">
        {/* Go Home button */}
        <Link
          to="/"
          className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Go Home
        </Link>

        {/* Go Back button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
