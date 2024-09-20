const express = require("express");
const router = express.Router();
const {
  getFilteredProducts,
  getProductById,
} = require("../../controllers/shop/products.controller");

router.get("/fetch-all-products", getFilteredProducts);
router.get("/fetch-product-by-id/:id", getProductById);

module.exports = router;
