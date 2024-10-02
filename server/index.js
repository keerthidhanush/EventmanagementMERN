require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event"); // Ensure this path is correct

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/events', eventRoutes); // Ensure this matches your event routes

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
