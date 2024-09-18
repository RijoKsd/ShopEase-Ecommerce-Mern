const express = require("express");
const router = express.Router();
const {
  getFilteredProducts,
} = require("../../controllers/shop/products.controller");

router.get("/fetch-all-products", getFilteredProducts);

module.exports = router;
