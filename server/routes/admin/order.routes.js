const express = require("express");
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order.controller");



const router = express.Router();

router.get("/get-all-orders", getAllOrdersOfAllUsers);
router.get("/get-order-details/:id", getOrderDetailsForAdmin);
router.put("/update-order-status/:id", updateOrderStatus);

module.exports = router