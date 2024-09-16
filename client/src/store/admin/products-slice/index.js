import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
};

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Add new product
export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      `${backendURL}/api/admin/products/add-product`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axios.get(
      `${backendURL}/api/admin/products/fetch-all-products`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ formData, id }) => {
    const response = await axios.put(
      `${backendURL}/api/admin/products/edit-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `${backendURL}/api/admin/products/delete-product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.products = [];
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default adminProductsSlice.reducer;
