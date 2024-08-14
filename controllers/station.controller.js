const {
  createStationService,
  getStationService,
  updateStationByIdService,
} = require("../services/station.service");

exports.createStation = async (req, res) => {
  try {
    const station = await createStationService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Station created",
      data: station,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Station creation not successful",
      error: error.message,
    });
  }
};

exports.getStation = async (req, res) => {
  try {
    const station = await getStationService(req.body.name);

    if (!station) {
      return res.status(404).json({
        status: "Not found",
        message: "Station not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Station found",
      data: station,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Station not found",
      error: error.message,
    });
  }
};

exports.updateStationById = async (req, res) => {
  try {
    const { id } = req.params;

    const station = await updateStationByIdService(id, req.body);

    if (!station.matchedCount) {
      return res.status(404).json({
        status: "Not found",
        message: "Station not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Station updated",
      data: station,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Station update not successful",
      error: error.message,
    });
  }
};
