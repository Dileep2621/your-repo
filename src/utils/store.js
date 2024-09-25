import { configureStore } from "@reduxjs/toolkit";
import { paginationSlice } from "../slice/paginationSlice";
import { inputSearchSlice } from "../slice/inputSearchSlice";
import { dataSlice } from "../slice/dataSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    inputSearch: inputSearchSlice.reducer,
    data: dataSlice.reducer,
  },
});
