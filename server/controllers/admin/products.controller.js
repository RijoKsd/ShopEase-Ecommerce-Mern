const { uploadImageToCloudinary } = require("../../helpers/cloudinary");

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
