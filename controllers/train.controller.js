const {
  createTrainService,
  getTrainService,
  getTrainByNameService,
  getTrainSchedulesService,
  createScheduleService,
  updateScheduleService,
} = require("../services/train.service");

exports.createTrain = async (req, res) => {
  try {
    const train = await createTrainService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Train created",
      data: train,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Train not created",
      error: error.message,
    });
  }
};

exports.getTrain = async (req, res) => {
  try {
    const { trains, count } = await getTrainService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Trains found",
      count: count,
      data: trains,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Trains not found",
      error: error.message,
    });
  }
};

exports.getTrainByName = async (req, res) => {
  try {
    const train = await getTrainByNameService(req.params.name);

    if (!train) {
      return res.status(404).json({
        status: "Not found",
        message:
          "Make sure you have spelled correctly including spaces in the train name.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Train found",
      data: train,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Trains not found",
      error: error.message,
    });
  }
};

// schedule functionalities

exports.getTrainSchedule = async (req, res) => {
  try {
    const schedules = await getTrainSchedulesService(req.params.name);

    if (!schedules) {
      return res.status(404).json({
        status: "Not found",
        message:
          "Make sure you have spelled train name correctly including spaces in the train name.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Train found",
      data: schedules,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Trains not found",
      error: error.message,
    });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { station, distanceFromCenter, arrivalTime, departureTime } =
      req.body;

    const stationName = station?.replace(/^\s+|\s+$/g, ""); // remove extra white space
    const scheduleInfo = {
      station: stationName,
      distanceFromCenter,
      arrivalTime,
      departureTime,
    };

    const newSchedules = await createScheduleService(
      req.params.trainId,
      scheduleInfo
    );

    if (newSchedules === "scheduleExists") {
      return res.status(409).json({
        status: "Already exists",
        message: "Schedule already exists",
      });
    } else if (newSchedules === "noTrain") {
      return res.status(404).json({
        status: "Not found",
        message: "Train not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Schedule created",
      data: newSchedules,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Schedule not created",
      error: error.message,
    });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { trainId, scheduleId: stopId } = req.params;
    const scheduleInfo = req.body;
    const { arrivalTime, departureTime } = scheduleInfo;
    const checkTimeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (arrivalTime) {
      // check if the provided time format matches "HH:mm" format
      const passed = checkTimeFormat.test(arrivalTime);

      if (!passed) {
        return res.status(400).json({
          status: "Bad request",
          message:
            "Ensure you have maintained 'HH:mm' format for time. Remove any white space. Supported time format '16:30', '08:05', '16:70'",
        });
      }
    }

    if (departureTime) {
      const passed = checkTimeFormat.test(departureTime);

      if (!passed) {
        return res.status(400).json({
          status: "Bad request",
          message:
            "Ensure you have maintained 'HH:mm' format for time. Remove any white space. Supported time format '16:30', '08:05', '16:70'",
        });
      }
    }

    if (arrivalTime >= departureTime) {
      return res.status(400).json({
        status: "Bad request",
        message: "arrivalTime must be before departureTime",
      });
    }

    const result = await updateScheduleService(trainId, stopId, req.body);

    if (result === "noTrain") {
      return res.status(404).json({
        status: "Not found",
        message: "Train not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Schedule updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Schedule not updated",
      error: error.message,
    });
  }
};
