import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global",
  initialState: {
    success: false,
    searchBar: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessage: (state) => {
      state.success = false;
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
  },
});

export const { setSuccess, clearMessage, toggleSearchBar } =
  globalReducer.actions;
export default globalReducer.reducer;
