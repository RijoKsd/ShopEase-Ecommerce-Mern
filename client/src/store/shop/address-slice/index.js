const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Add new address
export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${backendURL}/api/shop/address/add`,
      formData
    );
    return response?.data;
  }
);

// Get all addresses by user id
export const fetchAllAddresses = createAsyncThunk(
  "/address/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${backendURL}/api/shop/address/get/${userId}`
    );
    return response?.data;
  }
);

// Delete an address
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${backendURL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response?.data;
  }
);

// Edit an address
export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ formData, userId, addressId }) => {
    const response = await axios.put(
      `${backendURL}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response?.data;
  }
);

const initialState = {
  addresses: [],
  isLoading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
        state.addresses = [];
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
        state.addresses = [];
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      })
  },
});

export default addressSlice.reducer;
