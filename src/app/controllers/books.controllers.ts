import { Request, Response } from "express";
import app from "../../app";
import { Book } from "../models/books.model";
import express from 'express';


export const booksRoutes = express.Router()

booksRoutes.post("/create-book", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("your body", body);
    const data = await Book.create(body);
    console.log("your book", data);
    res.status(201).json({
      success: true,
      message: "Book Creation Done",
      data,
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
    const data = await Book.find();
    console.log("your all books", data);
    res.status(201).json({
      success: true,
      message: "All Books are shone here",
      data,
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
    const data = await Book.findById(bookId);
    console.log("your single books", data);
    res.status(201).json({
      success: true,
      message: "All Books are shone here",
      data,
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
    const data = await Book.findByIdAndUpdate(bookId, updateBooks, {new: true})
    console.log("your all books", data);
    res.status(201).json({
      success: true,
      message: "Books info has been update successfully",
      data,
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
    const data = await Book.findByIdAndDelete(bookId)
    console.log("your book has been deleted successfully", data);
    res.status(201).json({
      success: true,
      message: "Books info has been deleted successfully",
      data,
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