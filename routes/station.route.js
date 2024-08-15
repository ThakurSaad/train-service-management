const express = require("express");
const router = express.Router();

const stationController = require("../controllers/station.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/station", verifyToken, stationController.createStation);

router.get("/station", verifyToken, stationController.getStation);

router.patch("/station/:id", verifyToken, stationController.updateStationById);

module.exports = router;
