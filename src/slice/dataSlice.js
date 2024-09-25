import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for fetching data
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ inputSearch, itemsPerPage, offset }) => {
    const response = await axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        params: {
          namePrefix: inputSearch,
          limit: itemsPerPage,
          offset: offset,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_API_URL,
        },
      }
    );
    return response.data; // This will become the action.payload
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states of fetchData
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the fetched data in the state
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle errors
      });
  },
});

export default dataSlice.reducer;
