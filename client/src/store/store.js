import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./reducer";

// wrap this store with the provider
export const store = configureStore({
  reducer: {
    expense: expenseSlice,
  },
});
