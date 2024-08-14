const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.route");
const stationRoute = require("./routes/station.route");
const walletRoute = require("./routes/wallet.route");
// const trainRoute = require("./routes/train.route");

app.use("/api/v1/user", userRoute);
app.use("/api/v1", stationRoute);
app.use("/api/v1", walletRoute);
// app.use("/api/v1", trainRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Train index route",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Not found",
    message: "No route found",
  });
});

module.exports = app;
