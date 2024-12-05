const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");

// dotenv configuration
dotenv.config();

// middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// database connection
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("Database Connection Error", error));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
