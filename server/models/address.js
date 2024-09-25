const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
     
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema)
