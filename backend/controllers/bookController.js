const bookModel = require("../models/booksModel");
const val = require("../validators/validation");

//_publishBook_
const publishBook = async function (req, res) {
    try {
      let requestBody = req.body;
      if (!val.isvalidRequest(requestBody))
        return res
          .status(400)
          .send({ status: false, message: "book data is required in body" });
      let { title, excerpt, userId, bookImage, bookPurchaseLink, releasedAt } =
        requestBody;
  
      if (!val.isValidSpace(title))
        return res
          .status(400)
          .send({ status: false, message: "title is mandatory" });
  
      if (await bookModel.findOne({ title: title }))
        return res
          .status(400)
          .send({ status: false, message: "title already exist" });
  
      if (!val.isValidSpace(excerpt))
        return res
          .status(400)
          .send({ status: false, message: "excerpt is mandatory" });
  
      if (!val.isValidSpace(userId))
        return res
          .status(400)
          .send({ status: false, message: "userId is mandatory" });
  
      if (!val.isValidObjectId(userId))
        return res
          .status(400)
          .send({ status: false, message: "valid userId is mandatory" });
      
      if (!val.isValidSpace(bookImage))
        return res
          .status(400)
          .send({ status: false, message: "book image link is mandatory" });
      
      if (!val.isValidSpace(bookPurchaseLink))
        return res
          .status(400)
          .send({ status: false, message: "book purchase link is mandatory" });
          
      if (!val.isValidSpace(releasedAt))
        return res
          .status(400)
          .send({ status: false, message: "releasedAt is mandatory" });
  
      if (!val.isValidDate(releasedAt))
        return res
          .status(400)
          .send({ status: false, message: "releasedAt should be date" });
  
      let bookData = await bookModel.create(requestBody);
      return res
        .status(201)
        .send({ status: true, message: "Success", data: bookData });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  };

//_getBookByTitle_
const getBookByTitle = async function (req, res) {
    try {
      let title = req.query.title;
      let books = await bookModel
        .find({ title: { $regex: title, $options: 'i' } })
        .sort({ title: 1 });
      if (books.length == 0)
        return res.status(404).send({ status: false, message: "data not found" });

      return res
        .status(200)
        .send({ status: true, message: "Success", data: books });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  };

//_unPublish Book_

const unPublishBook = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    let unpublishedBook = await bookModel.findByIdAndUpdate(
      bookId,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!unpublishedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res
      .status(200)
      .send({ status: true, message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//_getBookByUser_

const getBooksByUser = async function (req, res) {
  
  try {
    let userId = req.userLoggedIn.userId;
    let books = await bookModel
      .find({ userId: userId, isDeleted: false })
    if (books.length == 0)
      return res.status(404).send({ status: false, message: "data not found" });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: books });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//_getAllBooks_

const getAllBooks = async function (req, res) {
  
  try {
    let books = await bookModel
      .find({ isDeleted: false })
    if (books.length == 0)
      return res.status(404).send({ status: false, message: "data not found" });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: books });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

module.exports = { publishBook, getBookByTitle, unPublishBook, getBooksByUser, getAllBooks };
