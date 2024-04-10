const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookByAuthor,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookByName,
  getBookByPages,
} = require("../Controllers/book.Controller");
const authenticateToken = require("../middleware/auth");

router
  .get("/book", authenticateToken, getAllBooks)
  .get("/:id", authenticateToken, getBookById)
  .get("/author/:author", authenticateToken, getBookByAuthor)
  .get("/name/:name", authenticateToken, getBookByName)
  .get("/pages/:pages", authenticateToken, getBookByPages)
  .post("/", createBook)
  .put("/:id", authenticateToken,updateBook)
  .delete("/:id", authenticateToken,deleteBook);


module.exports = router;