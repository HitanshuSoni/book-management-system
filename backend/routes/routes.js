const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
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
  )

module.exports = router;
