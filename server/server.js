const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// routes
const authRoutes = require("./routes/auth/auth.routes");
const adminProductsRoutes = require("./routes/admin/products.routes");
const shopProductsRoutes = require("./routes/shop/product.routes");
const shopCartRoutes = require("./routes/shop/cart.routes");
const shopAddressRoutes = require("./routes/shop/address.routes");
const shopOrderRoutes = require("./routes/shop/order.routes");
const adminOrderRoutes = require("./routes/admin/order.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/shop/products", shopProductsRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/shop/order", shopOrderRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(
      "Failed to connect to the database. Server not started.",
      err
    );
    process.exit(1);
  }
};

startServer();
