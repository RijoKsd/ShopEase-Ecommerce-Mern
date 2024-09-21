const Cart = require("../../models/cart");
const Product = require("../../models/product");
const User = require("../../models/user");

// add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItemIndex = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[existingItemIndex].quantity += quantity;
    }

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product added to cart", data: cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding product to cart" });
  }
};

// get cart items
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price image salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // check if product is deleted
    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        // ...cart._doc,
        ...cart.toObject(),
        items: populatedCartItems,
      },
    });
  } catch (error) {
    console.error("Error getting cart items:", error);
    res
      .status(500)
      .json({ success: false, message: "Error getting cart items" });
  }
};

// update cart quantity
exports.updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    cart.items[existingItemIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "title price image salePrice",
    });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id ?? null,
      title: item.productId?.title ?? null,
      price: item.productId?.price ?? null,
      image: item.productId?.image ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity,
    }));


    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        // ...cart._doc,
        ...cart.toObject(),
        items: populatedCartItems,
      },
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating cart quantity" });
  }
};

// remove product from cart
exports.deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price image salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

    await cart.save();

    await Cart.populate({
      path: "items.productId",
      select: "title price image salePrice",
    });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id ?? null,
      title: item.productId?.title ?? null,
      price: item.productId?.price ?? null,
      image: item.productId?.image ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: {
        // ...cart._doc,
        ...cart.toObject(),
        items: populatedCartItems,
      },
    });

   
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing product from cart" });
  }
};
