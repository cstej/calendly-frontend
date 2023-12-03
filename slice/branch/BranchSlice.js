import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch_id: "",
};

const BranchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    addBranchId: (state, action) => {
      state.branch_id = action.payload;
    },
  },
});

export const { addBranchId } = BranchSlice.actions;

export default BranchSlice.reducer;
