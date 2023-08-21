import express from "express";
import { Request, Response } from "express";
import data from "../data/data.js";
import Book from "../types/book.js";
import { log } from "console";

const router = express.Router();

function generateRandom4DigitNumber() {
  const min = 1000; // Minimum value (inclusive)
  const max = 9999; // Maximum value (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortByAlphabet(a: any, b: any, sort: string) {
  if (a.sort.toLowerCase() < b.sort.toLowerCase()) return -1;
  if (a.sort.toLowerCase() > b.sort.toLowerCase()) return 1;
  return 0;
}

router.get("/", (req: Book.Request, res: Book.Response) => {
  const page = parseInt(req.query.page || "1");
  const pageSize = parseInt(req.query.pageSize || "10");
  const startIndex = (page - 1) * pageSize;
  const filteredItems = data.slice(startIndex, startIndex + pageSize);
  //   const sortBy: string = req.query.sort;
  const sortBy: string | undefined = (req.query.sortBy as string) || "title";
  if (sortBy === "title") {
    filteredItems.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    });
  }
  if (sortBy === "author") {
    filteredItems.sort(function (a, b) {
      if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
      if (a.author.toLowerCase() > b.author.toLowerCase()) return 1;
      return 0;
    });
  }
  if (sortBy === "publicationYear") {
    filteredItems.sort(function (a, b) {
     return a.publicationYear - b.publicationYear;
    });
  }
  res.send({
    page: page,
    pageSize: pageSize,
    total: data.length,
    books: filteredItems,
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const book = data.find((it) => it.id === parseInt(id));
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send("Book is not found");
  }
});

router.post(
  "/",
    (req: Book.Request, res: Book.Response) => {
    const newBook: Book.Book = {
      id: generateRandom4DigitNumber(),
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
    };

    data.unshift(newBook);
    res.status(201).send("Book Created");
  }
);

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;

  const index = data.findIndex((book: Book.Book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Book is not found" });
  }
  if (title) {
    data[index].title = title;
  }
  if (author) {
    data[index].author = author;
  }
  if (publicationYear) {
    data[index].publicationYear = publicationYear;
  }

  res.status(200).json({ message: "info updated successfully", bookId: id });
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const index = data.findIndex((item) => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "book is not found" });
  }
  data.splice(index, 1);
  res.json({ message: "Book Deleted", bookId: id });
});

router.get("/searchByName", (req: Book.Request, res: Book.Response) => {
  const bookName: string | undefined = req.query.name?.toString();
  console.log("name");
  
  console.log(bookName);

  if (!bookName) {
    return res.status(400).json({ message: "bookName query is required" });
  }

  const filteredBooks = data.filter((book) =>
    book.title.toLowerCase().includes(bookName.toLowerCase())
  );
  console.log(filteredBooks);

  res.json(filteredBooks);
});

router.get("/searchByYear", (req: Book.Request, res: Book.Response) => {
//   const publishingYear: number | undefined = parseInt(req.query.year as string);
const publishingYear: number = parseInt(req.query.year as string);
log
  if (!publishingYear) {
    return res.status(400).json({ error: "Invalid publishing year provided" });
  }

  const filteredBooks = data.filter(
    (book: Book.Book) => book.publicationYear === publishingYear
  );

  res.json(filteredBooks);
});

export default router;
