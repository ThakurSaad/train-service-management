const express = require("express");
const router = express.Router();

const stationController = require("../controllers/station.controller");

router.post("/station", stationController.createStation);

router.get("/station", stationController.getStation);

router.patch("/station/:id", stationController.updateStationById);

module.exports = router;
