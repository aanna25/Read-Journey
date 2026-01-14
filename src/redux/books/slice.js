import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendedBooks } from "./operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    filter: { title: "", author: "" },
    isLoading: false,
    error: null,
    totalPages: 1,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export const { setFilter } = booksSlice.actions; 
export const booksReducer = booksSlice.reducer;