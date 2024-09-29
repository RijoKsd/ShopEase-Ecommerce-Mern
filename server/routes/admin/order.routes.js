const express = require("express");
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
} = require("../../controllers/admin/order.controller");



const router = express.Router();

router.get("/get-all-orders", getAllOrdersOfAllUsers);
router.get("/get-order-details/:id", getOrderDetailsForAdmin);

module.exports = router