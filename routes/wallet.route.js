const express = require("express");
const router = express.Router();

const walletController = require("../controllers/wallet.controller");

router.post("/wallet", walletController.createWallet);

router.get("/wallet/:email", walletController.getWalletByEmail);

router.get("/balance/:email", walletController.getBalance);

router.patch("/add-balance/:email", walletController.addBalance);

module.exports = router;
