import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import listingReducer from "./slice/listingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  listings: listingReducer,
});

// Redux persist config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"], // only persist user slice
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed because redux-persist stores non-serializable values
    }),
});

export const persistor = persistStore(store);
