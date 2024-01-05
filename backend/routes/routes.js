const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup); //signup user

router.post("/login", userController.login); //login user


module.exports = router;
