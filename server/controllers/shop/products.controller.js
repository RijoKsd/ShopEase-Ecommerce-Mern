const Product = require("../../models/product");

exports.getFilteredProducts = async (req, res) => {
   try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error getting filtered products", error);
    res.status(500).json({
      success: false,
      message: "Error getting filtered products",
    });
  }
};
