const Product = require("../../models/product");

exports.getFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      brand = [],
      sortBy = "price-low-to-high",
    } = req.query;

    let filters = {};
    if (category.length > 0) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length > 0) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-low-to-high":
        sort.price = 1;
        break;
      case "price-high-to-low":
        sort.price = -1;
        break;
      case "title-a-to-z":
        sort.title = 1;
        break;
      case "title-z-to-a":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    const products = await Product.find(filters).sort(sort);

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
