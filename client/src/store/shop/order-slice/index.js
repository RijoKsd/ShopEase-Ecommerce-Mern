import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createOrder = createAsyncThunk(
  "order,createOrder",
  async (orderData) => {
    const response = await axios.post(
      `${backendURL}/api/shop/order/create`,
      orderData
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `${backendURL}/api/shop/order/capture-payment`,
      { paymentId, payerId, orderId }
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("currentOrderId", action?.payload?.orderId);
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
