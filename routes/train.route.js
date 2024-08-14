const express = require("express");
const router = express.Router();

const trainController = require("../controllers/train.controller");

router.post("/train", trainController.createTrain);

module.exports = router;
