import { createSlice } from "@reduxjs/toolkit";
import { setLogout } from "./userSlice"; 

const initialState = {
  listings: [], // default empty array, avoids null checks
};

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
  },
  extraReducers: (builder) => {
    // Reset listings when user logs out
    builder.addCase(setLogout, (state) => {
      state.listings = [];
    });
  },
});

export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;
