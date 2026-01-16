import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations.js";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.token = null;
        state.error = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          (action.type.includes("register") || action.type.includes("login")),
        (state, action) => {
          if (state.token) return;
          state.error = action.payload;
        }
      );
  },
});

export const { resetAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
