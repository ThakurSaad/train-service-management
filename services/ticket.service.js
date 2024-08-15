const Train = require("../models/Train");
const { ObjectId } = require("mongodb");
const Wallet = require("../models/Wallet");
const Ticket = require("../models/Ticket");

exports.findTrainService = async (trainId) => {
  return await Train.findById(trainId);
};

exports.checkStopsService = async (ticketInfo) => {
  const { trainId, startStation, stopStation } = ticketInfo;

  const stopsExists = await Train.findOne({
    _id: trainId,
    "stops.station": { $all: [startStation.trim(), stopStation.trim()] },
  });

  if (stopsExists) {
    return "stopsExists";
  } else {
    const schedules = await Train.findOne({ _id: trainId }).select(
      "stops -_id"
    );
    return schedules;
  }
};

exports.purchaseTicketService = async (ticketInfo) => {
  const { userId, trainId, startStation, stopStation } = ticketInfo;

  const travelDistance = await Train.aggregate([
    // Step 1: Match the train with the given trainId
    {
      $match: {
        _id: ObjectId.createFromHexString(trainId),
        "stops.station": {
          $all: [startStation, stopStation],
        },
      },
    },
    // Step 2: Unwind the stops array to work with individual stations
    {
      $unwind: "$stops",
    },
    // Step 3: Filter to get only the start and stop stations
    {
      $match: {
        $or: [
          { "stops.station": startStation },
          { "stops.station": stopStation },
        ],
      },
    },
    // Step 4: Group back the start and stop stations, and calculate the distance difference
    {
      $group: {
        _id: "$_id",
        stations: {
          $push: {
            station: "$stops.station",
            distanceFromCenter: "$stops.distanceFromCenter",
          },
        },
      },
    },
    // Step 5: Calculate the difference between the distances
    {
      $project: {
        distanceDifference: {
          $abs: {
            $subtract: [
              { $arrayElemAt: ["$stations.distanceFromCenter", 0] },
              { $arrayElemAt: ["$stations.distanceFromCenter", 1] },
            ],
          },
        },
      },
    },
  ]);

  const newDistance = travelDistance[0].distanceDifference;
  const fare = newDistance * 5;

  const { balance } = await Wallet.findOne(
    { "user.id": userId },
    { balance: 1, _id: 0 }
  );

  console.log(balance, fare);

  if (balance < fare) {
    return "noBalance";
  }

  const ticket = {
    userId,
    trainId,
    startStation,
    stopStation,
    fare: fare,
  };

  const newTicket = await Ticket.create(ticket);

  await Wallet.updateOne(
    { "user.id": userId },
    {
      $inc: { balance: -fare },
      $push: {
        transactions: {
          amount: fare,
          type: "debit",
          date: new Date(),
        },
      },
    }
  );

  return { ticket: newTicket, deductedBalance: fare };
};
