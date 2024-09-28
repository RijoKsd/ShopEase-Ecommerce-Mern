const Order = require("../../models/order");
const paypal = require("../../helpers/paypal");
const Cart = require("../../models/cart");
//  Saving the order in DB
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateData,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: process.env.PAYPAL_RETURN_FRONTEND_URL,
        cancel_url: process.env.PAYPAL_CANCEL_FRONTEND_URL,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("Error in paypal.payment");
        return res.status(500).json({
          success: false,
          message: "Error in creating order",
        });
      } else {
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateData,
          paymentId,
          payerId,
        });

        await newOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        return res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder._id,
        });
      }
    });
  } catch (error) {
    console.error("Error in creating order");
    return res
      .status(500)
      .json({ message: "Error in creating order", success: false });
  }
};

//  Checking order is success or failure
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    order.paymentStatus = "paid";
    order.paymentId = paymentId;
    order.orderStatus = "confirmed";
    order.payerId = payerId;

    const currentCartId = order.cartId;
    await Cart.findByIdAndDelete(currentCartId);
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error in capturing payment");
    return res
      .status(500)
      .json({ message: "Error in capturing payment", success: false });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders) {
      return res
        .status(404)
        .json({ message: "Orders not found", success: false });
    }
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error in getting all orders by user");
    return res
      .status(500)
      .json({ message: "Error in getting all orders by user", success: false });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res.status(200).json({
      success: true,
      data: order,
    }); 
  } catch (error) {
    console.error("Error in getting order details");
    return res
      .status(500)
      .json({ message: "Error in getting order details", success: false });
  } 
};


module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
