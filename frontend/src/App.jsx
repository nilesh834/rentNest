import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "./redux/slice/userSlice";

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
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import toast from "react-hot-toast";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const { user, tokenExpiry } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check token expiry on rehydrate
  useEffect(() => {
    const storedExpiry = localStorage.getItem("tokenExpiry");
    if (storedExpiry && Date.now() > parseInt(storedExpiry, 10)) {
      dispatch(setLogout());
      toast.error("Session expired. Please log in again.");
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  // Keep checking token expiry every 30s
  useEffect(() => {
    if (!tokenExpiry) return;
    const checkExpiry = () => {
      if (Date.now() > tokenExpiry) {
        dispatch(setLogout());
        toast.error("Session expired. Please log in again.");
        navigate("/login", { replace: true });
      }
    };
    checkExpiry();
    const interval = setInterval(checkExpiry, 30000);
    return () => clearInterval(interval);
  }, [tokenExpiry, dispatch, navigate]);

  return user ? children : <Navigate to="/login" replace />;
};

// Wrapper to handle routes + footer together
const AppLayout = () => {
  const location = useLocation();

  // Hide footer on login/register
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
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
          path="/:userId/wishlist"
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
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Only show footer if not login/register */}
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
