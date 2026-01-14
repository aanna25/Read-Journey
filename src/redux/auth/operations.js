import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "../../services/authApi";
import { clearAuthToken, setAuthToken } from "../../services/axiosInstance";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const data = await registerUser(credentials);
      setAuthToken(data.token);
      toast.success("Registration successful! Welcome!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration error";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginUser(credentials);
      setAuthToken(data.token);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Incorrect email or password!";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    clearAuthToken();
    toast.info("You have successfully logged out!");
  } catch (error) {
    clearAuthToken();
    toast.error(
      "An error occurred while logging out, but the session data was cleared"
    );
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue("No token");
  }

  setAuthToken(persistedToken);
  try {
    const data = await refreshUser();
    return data;
  } catch (error) {
    clearAuthToken();
    return thunkAPI.rejectWithValue(error.message);
  }
});
