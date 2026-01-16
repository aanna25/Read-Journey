import { createSlice } from "@reduxjs/toolkit";
import {
  addBookById,
  deleteBook,
  fetchRecommendedBooks,
  fetchUserBooks,
} from "./operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    filter: { title: "", author: "" },
    ownItems: [],
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
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.ownItems = action.payload; 
      })
      .addCase(addBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownItems.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownItems = state.ownItems.filter(
          (book) => book._id !== action.payload
        );
      });
  },
});

export const { setFilter } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
