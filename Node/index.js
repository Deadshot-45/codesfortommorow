const express = require("express");
const UserRoutes = require("./Routes/User.route.js");
const mongoose = require("mongoose");
const dbConnect = require("./Utils/dbConnect.js");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow all HTTP methods
};
app.use(cors(corsOptions));

const port = process.env.PORT || 7500;
app.use(express.json());

// app.use(async (req, res, next) => {
//   try {
//     await dbConnect();
//     next();
//   } catch (error) {
//     console.log("Database connection failed:", error.message);
//     res.status(500).json({
//       error: true,
//       message: "Database connection failed",
//     });
//   }
// });

app.use("/api/data/user", UserRoutes);

app.get("/", (req, res, next) => {
  console.log("Welcome to the server");
});

// 404 error handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: true,
    message: "Page not found",
  });
});
// Global error handler
app.use((err, req, res) => {
  res.status(500).json({
    error: true,
    message: err.message,
  });
});

// Start the server
app.listen(port, () => {
  dbConnect()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error.message);
    });
  console.log("Server Started on port : ", port);
});
