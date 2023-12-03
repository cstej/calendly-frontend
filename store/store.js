import BranchSlice from "@/slice/branch/BranchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    branchSlice: BranchSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
