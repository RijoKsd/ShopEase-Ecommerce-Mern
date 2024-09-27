const express = require("express");
const router = express.Router();

const {
  createOrder,
  capturePayment,
} = require("../../controllers/shop/order.controller");


router.post("/create", createOrder);
router.post("/capture-payment", capturePayment);

module.exports = router