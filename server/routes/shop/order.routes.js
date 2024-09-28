const express = require("express");
const router = express.Router();

const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order.controller");


router.post("/create", createOrder);
router.post("/capture-payment", capturePayment);
router.get("/get-orders/:userId", getAllOrdersByUser);
router.get("/get-order-details/:orderId", getOrderDetails);


module.exports = router