const express = require('express');
const bookRouter = express.Router();
const { createBook,
    getBook,
    getAllBooks,
    updateBook,
    deleteBook} = require('../controllers/bookController');
const isLoggedIn = require('../middleware/authentication');

bookRouter.post('/createBook', isLoggedIn, createBook);
bookRouter.get('/getAllBooks', isLoggedIn, getAllBooks);
bookRouter.get('/getBookById', isLoggedIn, getBook);
bookRouter.patch('/updateBook/:bookId', isLoggedIn, updateBook);
bookRouter.delete('/deleteBook', isLoggedIn, deleteBook);

module.exports = bookRouter;