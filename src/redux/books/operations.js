import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../services/axiosInstance";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommended",
async ({ page, limit, title, author }, thunkAPI) => { 
    try {
      const { data } = await instance.get("/books/recommend", {
        params: { 
          page, 
          limit,
          title: title || undefined, 
          author: author || undefined,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);