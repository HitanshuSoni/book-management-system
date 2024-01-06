const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const middleware = require("../middleware/middleware");


router.post("/signup", userController.signup); //signup user

router.post("/login", userController.login); //login user

router.post(
    "/books/publish",
    middleware.authentication,
    middleware.authorization,
    bookController.createBook
  ); //create book

module.exports = router;
