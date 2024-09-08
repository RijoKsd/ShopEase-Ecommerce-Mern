import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      //  If server responded with an error, reject the promise
      if (error?.response?.data) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({
        message: "An error occurred while registering",
        success: false,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        return rejectWithValue(error?.response?.data);
      }
      return rejectWithValue({
        message: "An error occurred while logging in",
        success: false,
      });
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // need to work  on this
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        // state.user = action.payload;
        state.user = null;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
