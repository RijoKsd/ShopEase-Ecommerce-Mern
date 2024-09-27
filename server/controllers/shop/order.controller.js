const Order = require("../../models/order");
const paypal = require("../../helpers/paypal");
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
              sku: item._id,
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
  } catch (error) {
    console.error("Error in capturing payment");
    return res
      .status(500)
      .json({ message: "Error in capturing payment", success: false });
  }
};

module.exports = {
  createOrder,
  capturePayment,
};
