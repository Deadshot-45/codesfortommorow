const express = require("express");
const UserRoutes = require("./Routes/User.route.js");
const dbConnect = require("./Utils/Connect.js");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

const port = process.env.PORT || 7500;
app.use(express.json());
app.use(helmet());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

app.use("/api/data/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: "Page not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: true,
    message: err.message,
  });
});

// Connect to DB once, then start server
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Started on port : ", port);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
