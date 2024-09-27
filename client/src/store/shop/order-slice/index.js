import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

export const createOrder = createAsyncThunk('order,createOrder', async(orderData)=>{
    const response = await axios.post(`${backendURL}/api/shop/order/create`, orderData);
    return response.data
})

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
      console.log(action.payload, "order slice")
      state.orderId = action.payload.orderId;
      state.approvalURL = action.payload.approvalURL
    })
    .addCase(createOrder.rejected, (state) => {
      state.isLoading = false;
      state.approvalURL = null;
      state.orderId = null;
    })
  },
});

export default shoppingOrderSlice.reducer;
