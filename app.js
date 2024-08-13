const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

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
