import { createSlice } from "@reduxjs/toolkit";

export const inputSearchSlice = createSlice({
  name: "inputSearch",
  initialState: {
    searchText: "",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = inputSearchSlice.actions;

export default inputSearchSlice.reducer;
