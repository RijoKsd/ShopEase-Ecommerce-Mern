const { uploadImageToCloudinary } = require("../../helpers/cloudinary");
const product = require("../../models/product");

// exports.handleImageUpload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ message: "No file uploaded", success: false });
//     }
//     const imageUrl = await uploadImageToCloudinary(req.file.buffer);
//     res.status(200).json({ imageUrl, success: true });
//   } catch (error) {
//     console.error("Error uploading image to cloudinary", error);
//     res
//       .status(500)
//       .json({ message: "Error uploading image to cloudinary", success: false });
//   }
// };

exports.handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const imageUrl = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadImageToCloudinary(imageUrl);
    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image to cloudinary", error);
    res
      .status(500)
      .json({ message: "Error uploading image to cloudinary", success: false });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  const {
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    image,
  } = req.body;

  try {
    const newProduct = new product({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      image,
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product", error);
    return res
      .status(500)
      .json({ message: "Error adding product", success: false });
  }
};

// Fetch all products
exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching all products", error);
    return res
      .status(500)
      .json({ message: "Error fetching all products", success: false });
  }
};

// Edit product
exports.editProduct = async (req, res) => {
  const {
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    image,
  } = req.body;
  try {
    const { id } = req.params;

    const product = await product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.salePrice = salePrice || product.salePrice;
    product.totalStock = totalStock || product.totalStock;
    product.image = image || product.image;

    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product edited successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error editing product", error);
    return res
      .status(500)
      .json({ message: "Error editing product", success: false });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    await product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product", error);
    return res
      .status(500)
      .json({ message: "Error deleting product", success: false });
  }
};
