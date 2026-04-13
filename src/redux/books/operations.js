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
  },
);

export const addBook = createAsyncThunk(
  "books/add",
  async (bookData, thunkAPI) => {
    try {
      const { data } = await instance.post("/books/add", bookData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchUserBooks = createAsyncThunk(
  "books/fetchOwn",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/books/own");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (bookId, thunkAPI) => {
    try {
      await instance.delete(`/books/remove/${bookId}`);
      return bookId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addBookById = createAsyncThunk(
  "books/addById",
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.post(`/books/add/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBookInfo = createAsyncThunk(
  "books/getInfo",
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.get(`/books/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const startReading = createAsyncThunk(
  "books/startReading",
  async ({ id, page }, thunkAPI) => {
    try {
      const { data } = await instance.post("/books/reading/start", {
        id,
        page,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const stopReading = createAsyncThunk(
  "books/stopReading",
  async ({ id, page }, thunkAPI) => {
    try {
      const { data } = await instance.post("/books/reading/finish", {
        id,
        page,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteReadingSession = createAsyncThunk(
  "books/deleteSession",
  async ({ bookId, sessionId }, thunkAPI) => {
    try {
      const { data } = await instance.delete("/books/reading", {
        params: { bookId, sessionId },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
