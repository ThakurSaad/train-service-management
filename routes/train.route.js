const express = require("express");
const router = express.Router();

const trainController = require("../controllers/train.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/train/add-train", verifyToken, trainController.createTrain);

router.get("/train", verifyToken, trainController.getTrain);

router.get("/train/:name", verifyToken, trainController.getTrainByName);

router.get("/schedule/:name", verifyToken, trainController.getTrainSchedule);

router.post("/schedule/:trainId", verifyToken, trainController.createSchedule);

router.patch(
  "/schedule/:trainId/:scheduleId",
  verifyToken,
  trainController.updateSchedule
);

module.exports = router;
