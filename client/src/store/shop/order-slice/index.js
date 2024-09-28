import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList:[],
  orderDetails: null
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


 
export const getAllOrdersByUser = createAsyncThunk(
  "order/getAllOrdersByUser",
  async (userId) => {
    const response = await axios.get(
      `${backendURL}/api/shop/order/get-orders/${userId}`
    );
    return response.data;
  }
);


export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId) => {
    const response = await axios.get(
      `${backendURL}/api/shop/order/get-order-details/${orderId}`
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
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser,(state, action)=>{
        state.isLoading = false;
        state.orderList = action.payload.data;

      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
