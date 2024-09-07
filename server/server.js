const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({}));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
