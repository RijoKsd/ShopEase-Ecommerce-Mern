import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Register a new user
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

// Login a user
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

// Logout user

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${backendURL}/api/auth/logout`,{}, {
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
  

})

// Check if the user is authenticated
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/api/auth/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-cache, no-store, must-revalidate, proxy-revalidate",
          Expires: "0",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({
        message: "An error occurred while checking authentication",
        success: false,
      });
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: true,
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
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
