import { Request, Response } from "express";
import app from "../../app";
import { Book } from "../models/books.model";
import express from 'express';


export const booksRoutes = express.Router()

booksRoutes.post("/create-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("your body", body);
    const book = await Book.create(body);
    console.log("your book", book);
    res.status(201).json({
      success: true,
      message: "Book Creation Done",
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
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
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
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId
    const books = await Book.findById(bookId);
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
booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBooks = req.body
    const books = await Book.findByIdAndUpdate(bookId, updateBooks, {new: true})
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
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBooks = req.body
    const books = await Book.findByIdAndDelete(bookId)
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