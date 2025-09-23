import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  tokenExpiry: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Calculate expiry timestamp
      const expiryTime = Date.now() + action.payload.expiresIn * 1000;
      state.tokenExpiry = expiryTime;

      // Store in localStorage so App.jsx can read it on reload
      localStorage.setItem("tokenExpiry", expiryTime);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;

      // Cleanup persisted expiry timestamp
      localStorage.removeItem("tokenExpiry");
    },
    setTripList: (state, action) => {
      if (state.user) state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      if (state.user) state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      if (state.user) state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      if (state.user) state.user.reservationList = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;

export default userSlice.reducer;
