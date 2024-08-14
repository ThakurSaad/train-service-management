const Station = require("../models/Station");

exports.createStationService = async (station) => {
  return await Station.create(station);
};

exports.getStationService = async (stationName) => {
  return await Station.findOne({ name: stationName });
};

exports.updateStationByIdService = async (id, data) => {
  return await Station.updateOne({ _id: id }, data);
};
