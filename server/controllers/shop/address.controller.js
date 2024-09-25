const Address = require("../../models/address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    res.status(201).json({
      message: "Address added successfully",
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.error("Error adding address", error);
    res.status(500).json({ message: "Error adding address", success: false });
  }
};

const fetchAllAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const addresses = await Address.find({ userId });

    res.status(200).json({
      message: "Addresses fetched successfully",
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses", error);
    res
      .status(500)
      .json({ message: "  Error fetching addresses", success: false });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ message: "Address not found", success: false });
    }

    res.status(200).json({
      message: "Address edited successfully",
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Error in editing address", error);
    res
      .status(500)
      .json({ message: "Error in editing address", success: false });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res
        .status(404)
        .json({ message: "Address not found", success: false });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleting address", error);
    res
      .status(500)
      .json({ message: "Error in deleting address", success: false });
  }
};

module.exports = {
  addAddress,
  fetchAllAddresses,
  editAddress,
  deleteAddress,
};
