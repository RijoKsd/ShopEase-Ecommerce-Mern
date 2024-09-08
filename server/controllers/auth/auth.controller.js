const User = require("../../models/user");
const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
      success: false,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          message: "User already exists with this email",
          success: false,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error while registering user", err.message);
    return res
      .status(500)
      .json({ message: "Error while registering user", success: false });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
      success: false,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.cookie('token', token, {httpOnly: true, secure: false}).json({
      message: "User logged in successfully",
      success: true,
      user:{
        id: user._id,
        role: user.role,
        email: user.email,
      }
    })

  

  } catch (error) {
    console.error("Error while logging in user", error.message);
    return res
      .status(500)
      .json({ message: "Error while logging in user", success: false });
  }
};

// Logout a user

exports.logout = async (req, res) => {};
