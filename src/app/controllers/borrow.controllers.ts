import express, { Request, Response } from "express";
import { BorrowedBook } from "../models/borrow.model";
export const borrowedBooksRoutes = express.Router();

// borrowedBooksRoutes.post("/borrow-book", async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     console.log("your body", body);
//     const book = await BorrowedBook.create(body);
//     console.log("your book", book);
//     res.status(201).json({
//       success: true,
//       message: "Book borrowed successfully",
//       book,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: error.message,
//       error,
//     });
//   }
// });
borrowedBooksRoutes.post(
  "/borrow-book",
  async (req: Request, res: Response) => {
    try {
      const { bookId, quantity, dueDate, isBorrowed } = req.body;

      // Static method ব্যবহার করা হচ্ছে
      const data = await BorrowedBook.borrowBook(bookId, quantity, dueDate, isBorrowed);

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
);
borrowedBooksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await BorrowedBook.find().populate("bookId");
    console.log("your all books", books);
    res.status(201).json({
      success: true,
      message: "All Books are shown here",
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
borrowedBooksRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await BorrowedBook.aggregate([
      {
        $group: {
          _id: "$bookId", // book অনুযায়ী group করা হচ্ছে
          totalQuantity: { $sum: "$quantity" }, // quantity যোগ করা হচ্ছে
        },
      },
      {
        $lookup: {
          from: "books", // Book collection
          localField: "_id", // group করা book id
          foreignField: "_id", // Book এর _id এর সাথে match করবে
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo", // bookInfo array কে object বানানো
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      summary,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
borrowedBooksRoutes.get("/:borrowId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
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
    const updateBooks = req.body;
    const books = await BorrowedBook.findByIdAndUpdate(bookId, updateBooks, {
      new: true,
    });
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
borrowedBooksRoutes.delete(
  "/:borrowId",
  async (req: Request, res: Response) => {
    try {
      const bookId = req.params.bookId;
      const updateBooks = req.body;
      const books = await BorrowedBook.findByIdAndDelete(bookId);
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
  },
);
