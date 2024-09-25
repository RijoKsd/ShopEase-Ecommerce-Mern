const express = require("express");
const router = express.Router();
const {
  addAddress,
  fetchAllAddresses,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address.controller");

router.get("/get/:userId", fetchAllAddresses);
router.post("/add", addAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

module.exports = router;
