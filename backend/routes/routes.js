const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const healthCheckController = require("../controllers/healthCheckController");
const middleware = require("../middleware/middleware");


router.post("/api/auth/signup", userController.signup); //signup user

router.post("/api/auth/login", userController.login); //login user

router.post(
    "/api/books/publish",
    middleware.authentication,
    middleware.authorization,
    bookController.publishBook
  ); //create book

  router.get(
    "/api/books/search", 
    bookController.getBookByTitle
  ); // get book by title

  router.put(
    "/api/books/unpublish/:bookId",
    middleware.authentication,
    middleware.authorization,
    bookController.unPublishBook
  ); // unpublish book

  router.get(
    "/api/books/user",
    middleware.authentication,
    bookController.getBooksByUser
  ); // get all books by current user

  router.get(
    "/api/books/published",
    bookController.getAllBooks
  ) // get all books

  router.get(
    "/api/health-checkup",
    healthCheckController.checkHealth
  ) // check server health

module.exports = router;
