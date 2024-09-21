const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteFromCart,
  updateCartQuantity,
} = require("../../controllers/shop/cart.controller");

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update-quantity", updateCartQuantity);
router.delete("/delete/:userId/:productId", deleteFromCart);


module.exports = router;