const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  cartId : String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      salePrice: String,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
    quantity: Number,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateData: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", orderSchema);
