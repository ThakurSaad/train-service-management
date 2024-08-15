const express = require("express");
const router = express.Router();

const walletController = require("../controllers/wallet.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/wallet", verifyToken, walletController.createWallet);

router.get("/wallet/:email", verifyToken, walletController.getWalletByEmail);

router.get("/balance/:email", verifyToken, walletController.getBalance);

router.patch("/add-balance/:email", verifyToken, walletController.addBalance);

module.exports = router;
