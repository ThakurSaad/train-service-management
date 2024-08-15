const {
  purchaseTicketService,
  findTrainService,
  checkStopsService,
} = require("../services/ticket.service");

exports.purchaseTicket = async (req, res) => {
  try {
    const ticketInfo = req.body;
    const { userId, trainId, startStation, stopStation } = ticketInfo;

    const newStartStation = startStation.replace(/^\s+|\s+$/g, "");
    const newStopStation = stopStation.replace(/^\s+|\s+$/g, "");

    if (newStartStation === newStopStation) {
      return res.status(400).json({
        status: "Bad request",
        message: "Start and stop station can't be same",
      });
    }

    ticketInfo.startStation = newStartStation;
    ticketInfo.stopStation = newStopStation;

    const train = await findTrainService(ticketInfo.trainId);

    if (!train) {
      return res.status(404).json({
        status: "Not found",
        message: "No train found. Ensure the trainId is correct",
      });
    }

    const checkStops = await checkStopsService(ticketInfo);

    if (checkStops !== "stopsExists") {
      return res.status(400).json({
        status: "Bad request",
        message:
          "Make sure the startStation and stopStation is available in the stops fields of this train",
        stops: checkStops,
      });
    }

    const ticket = await purchaseTicketService(ticketInfo);

    if (ticket === "noBalance") {
      return res.status(402).json({
        status: "Insufficient balance",
        message: "Please recharge your wallet",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Ticket purchased",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: "Ticket not purchased",
      error: error.message,
    });
  }
};
