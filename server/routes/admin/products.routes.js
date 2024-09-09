const express = require("express");
const {
  handleImageUpload,
} = require("../../controllers/admin/products.controller");
const { upload } = require("../../helpers/cloudinary");

const Router = express.Router();

Router.post("/upload-image", upload.single('my_file'), handleImageUpload)

module.exports = Router
