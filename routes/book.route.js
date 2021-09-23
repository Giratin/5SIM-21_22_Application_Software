const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

// localhost:3000/books/
/**
 * @Path /books/
 */
router.get("/", bookController.getBooks );

/**
 * @Path /books/id
 */
router.get("/:book_id", bookController.getBookById );

module.exports = router;