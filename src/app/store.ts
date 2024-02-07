import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../components/slices/authSlice";

export const store = configureStore({
  reducer: {
    accounts: authSliceReducer,
  },
});
