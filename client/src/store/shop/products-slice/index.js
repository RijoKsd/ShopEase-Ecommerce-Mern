import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  products: [],
  isLoading: false,
};

// Fetch all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axios.get(
      `${backendURL}/api/shop/products/fetch-all-products`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.products = [];
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default shoppingProductSlice.reducer;
