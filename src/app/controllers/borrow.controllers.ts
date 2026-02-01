import express, { Request, Response } from 'express';
import { BorrowedBook } from '../models/borrow.model';
export const borrowedBooksRoutes = express.Router()


borrowedBooksRoutes.post("/borrow-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("your body", body);
    const book = await BorrowedBook.create(body);
    console.log("your book", book);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      book,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
borrowedBooksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await BorrowedBook.find().populate('book');
    console.log("your all books", books);
    res.status(201).json({
      success: true,
      message: "All Books are shone here",
      books,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
borrowedBooksRoutes.get("/:borrowId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const books = await BorrowedBook.findById(bookId);
    console.log("your single books", books);
    res.status(201).json({
      success: true,
      message: "All Books are shone here",
      books,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
borrowedBooksRoutes.patch("/:borrowId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBooks = req.body
    const books = await BorrowedBook.findByIdAndUpdate(bookId, updateBooks, {new: true})
    console.log("your all books", books);
    res.status(201).json({
      success: true,
      message: "Books info has been update successfully",
      books,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
borrowedBooksRoutes.delete("/:borrowId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBooks = req.body
    const books = await BorrowedBook.findByIdAndDelete(bookId)
    console.log("your book has been deleted successfully", books);
    res.status(201).json({
      success: true,
      message: "Books info has been deleted successfully",
      books,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});