import express from "express";
import { Request, Response } from "express";
import data from "../data/data.js";
import Book from "../types/book.js";
import { log } from "console";

const router = express.Router();


router.get("/name", (req: Book.Request, res: Book.Response) => {
  const bookName: string | undefined = req.query.name?.toString();
  

  if (!bookName) {
    return res.status(400).json({ message: "bookName query is required" });
  }

  const filteredBooks = data.filter((book) =>
    book.title.toLowerCase().includes(bookName.toLowerCase())
  );
  console.log(filteredBooks);

  res.json(filteredBooks);
});

router.get("/year", (req: Book.Request, res: Book.Response) => {
//   const publishingYear: number | undefined = parseInt(req.query.year as string);
const publishingYear: number = parseInt(req.query.year as string);
  if (!publishingYear) {
    return res.status(400).json({ error: "Invalid publishing year provided" });
  }

  const filteredBooks = data.filter(
    (book: Book.Book) => book.publicationYear === publishingYear
  );

  res.json(filteredBooks);
});

export default router;
