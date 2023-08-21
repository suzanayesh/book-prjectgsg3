import express from "express";
import data from "../data/data.js";
const router = express.Router();
router.get("/name", (req, res) => {
    var _a;
    const bookName = (_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString();
    if (!bookName) {
        return res.status(400).json({ message: "bookName query is required" });
    }
    const filteredBooks = data.filter((book) => book.title.toLowerCase().includes(bookName.toLowerCase()));
    console.log(filteredBooks);
    res.json(filteredBooks);
});
router.get("/year", (req, res) => {
    //   const publishingYear: number | undefined = parseInt(req.query.year as string);
    const publishingYear = parseInt(req.query.year);
    if (!publishingYear) {
        return res.status(400).json({ error: "Invalid publishing year provided" });
    }
    const filteredBooks = data.filter((book) => book.publicationYear === publishingYear);
    res.json(filteredBooks);
});
export default router;
