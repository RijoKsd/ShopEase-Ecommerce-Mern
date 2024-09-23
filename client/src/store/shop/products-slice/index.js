import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  products: [],
  productDetails : null,
  isLoading: false,
};

// Fetch all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `${backendURL}/api/shop/products/fetch-all-products?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Fetch product by id
export const fetchProductById = createAsyncThunk(
  "/products/fetchProductById",
  async ( id ) => {
    const response = await axios.get(
      `${backendURL}/api/shop/products/fetch-product-by-id/${id}`,
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
  reducers: {
    setProductDetailsNull: (state) => {
      state.productDetails = null;
    }
  },
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
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.productDetails = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const {setProductDetailsNull}  = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
