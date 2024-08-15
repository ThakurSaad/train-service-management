const Train = require("../models/Train");

exports.createTrainService = async (train) => {
  return await Train.create(train);
};

exports.getTrainService = async (train) => {
  const trains = await Train.find();
  const count = await Train.countDocuments();
  return { trains, count };
};

exports.getTrainByNameService = async (name) => {
  return await Train.findOne({ name: name }).collation({
    locale: "en",
    strength: 1,
  });
};

exports.getTrainSchedulesService = async (trainName) => {
  const schedules = await Train.findOne({ name: trainName })
    .collation({
      locale: "en",
      strength: 1,
    })
    .select("stops -_id");
  return schedules;
};

exports.createScheduleService = async (trainId, scheduleInfo) => {
  const train = await Train.findById(trainId);

  if (!train) {
    return "noTrain";
  }

  const stops = train.stops;
  const foundSchedule = stops.find(
    (stop) => stop.station === scheduleInfo.station
  );

  if (foundSchedule) {
    return "scheduleExists";
  }

  const newSchedules = await Train.findOneAndUpdate(
    { _id: trainId },
    {
      $push: {
        stops: scheduleInfo,
      },
    },
    { returnDocument: "after", projection: { stops: 1, _id: 0 } }
  );

  return newSchedules;
};

exports.updateScheduleService = async (trainId, stopId, fieldsToUpdate) => {
  const train = await Train.findById(trainId);

  if (!train) {
    return "noTrain";
  }

  const updatedFields = {};

  // Conditionally add fields to the update object
  if (fieldsToUpdate.arrivalTime) {
    updatedFields["stops.$.arrivalTime"] = fieldsToUpdate.arrivalTime;
  }
  if (fieldsToUpdate.departureTime) {
    updatedFields["stops.$.departureTime"] = fieldsToUpdate.departureTime;
  }
  if (fieldsToUpdate.station) {
    updatedFields["stops.$.station"] = fieldsToUpdate.station;
  }

  return Train.updateOne(
    { _id: trainId, "stops._id": stopId },
    { $set: updatedFields }
  );
};
