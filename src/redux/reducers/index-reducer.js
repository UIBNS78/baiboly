import { createSlice } from "@reduxjs/toolkit";

export const indexSlice = createSlice({
  name: "c",
  initialState: {
    snackbar: { open: false, message: "", severity: "info" },
  },
  reducers: {
    handleSnackbar: (state, action) => {
      state.snackbar = action.payload.snackbar;
    },
  },
});

export const { handleSnackbar } = indexSlice.actions;

export default indexSlice.reducer;
