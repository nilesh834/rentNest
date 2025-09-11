import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/:listingId"
          element={
            <PrivateRoute>
              <ListingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/category/:category"
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/listings/search/:search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />

        {/* User-specific routes */}
        <Route
          path="/:userId/trips"
          element={
            <PrivateRoute>
              <TripList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/wishList"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/properties"
          element={
            <PrivateRoute>
              <PropertyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userId/reservations"
          element={
            <PrivateRoute>
              <ReservationList />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
