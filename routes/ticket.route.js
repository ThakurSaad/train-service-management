const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/purchase-ticket", verifyToken, ticketController.purchaseTicket);

module.exports = router;
