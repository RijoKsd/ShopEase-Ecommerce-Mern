const Order = require("../../models/order");


 exports.getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});
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
    console.error("Error in getting all orders ");
    return res
      .status(500)
      .json({ message: "Error in getting all orders ", success: false });
  }
};



exports.getOrderDetailsForAdmin = async (req, res) => {
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

exports.updateOrderStatus = async (req,res)=>{

  try{
    const {id} = req.params;
    const {orderStatus} = req.body;

    const order = await Order.findById(id);
    if(!order){
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    await Order.findByIdAndUpdate(id,{orderStatus});
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  }catch(error){
    console.error("Error in updating order status");
    return res
      .status(500)
      .json({ message: "Error in updating order status", success: false });
  }

}