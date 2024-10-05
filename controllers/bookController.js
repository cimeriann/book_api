const logger = require("../utils/logger");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/errorHandler");
const Books = require("../models/Book");

const createBook = async (req, res, next) => {
  try {
    logger.info(`START: Create Book Service`);
    const { author, title, genre } = req.body;
    const userId = req.user.userId;

    if (!author || !title || !genre) {
      logger.info(`END: Create Book Service`);
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "missing required parameters"
      );
    }

    const newBook = await Books.create({
      author,
      title,
      genre,
      createdBy: userId,
    });
    successResponse(res, StatusCodes.CREATED, "Book Created", newBook);
    logger.info(`END: Create Book Service`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const getBook = async (req, res, next) => {
  try {
    logger.info(`START: Get Book Service`);
    const bookId = req.params.id;
    const userId = req.user.userId;

    const book = await Books.findOne({ _id: bookId, createdBy: userId });

    if (!book) {
      logger.info(`END: Get Book Service`);
      return errorResponse(res, StatusCodes.BAD_REQUEST, "book does not exist");
    }
    logger.info(`END: Get Book Service`);
    successResponse(res, StatusCodes.OK, "fetch book by id", book);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    logger.info(`START: GET Book Service`);
    const userId = req.user.userId;

    const books = await Books.findOne({ createdBy: userId });

    if (!books) {
      logger.info(`END: Get Book Service`);
      return errorResponse(res, StatusCodes.BAD_REQUEST, "books not found");
    }
    logger.info(`END: Get Book Service`);
    successResponse(res, StatusCodes.OK, "successfully found all books", books);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;
    const { author, title, genre } = req.body;

    const book = await Books.findAndUpdate({
      _id: bookId,
      title: title,
      author: author,
      genre: genre,
      createdBy: userId,
    });

    if (!book) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, `book does not exist`);
    }

    successResponse(res, StatusCodes.OK, `successfully udpated a book`, book);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const book = await Books.findOne({ _id: bookId, createdBy: userId });

    if (!book) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, `book does not exist`);
    }

    await Books.deleteOne({ _id: bookId });

    successResponse(res, StatusCodes.OK, `successfully deleted a book`, null);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

module.exports = {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
