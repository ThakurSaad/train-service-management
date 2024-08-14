const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/signup", userController.signUp);

router.get("/login", userController.login);

module.exports = router;
