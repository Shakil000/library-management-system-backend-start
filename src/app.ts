import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controllers";
import { borrowedBooksRoutes } from "./app/controllers/borrow.controllers";
import cors from 'cors'
import { Book } from "./app/models/books.model";
import { BorrowedBook } from "./app/models/borrow.model";

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowedBooksRoutes)




app.get("/api/books", async (req: Request, res: Response) => {
  try {
    const books = await Book.find(); 
    console.log(books)  // MongoDB থেকে সব বই আনবে
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Create new books
app.post("/api/books/create-book", async (req: Request, res: Response) => {
  const book = new Book(req.body);
  const savedBook = await book.save();
  res.status(201).json(savedBook);
});

// Create borrow Book
app.post("/api/borrow/borrow-book", async (req, res) => {
  try {
    const { bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    if (book.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }

    // Borrow record create
    const borrow = await BorrowedBook.create({
      bookId,
      quantity,
      dueDate,
    });

    // Direct update (better)
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        $inc: { copies: -quantity },
        $set: {
          isBorrowed: true,
          available: book.copies - quantity > 0
        }
      },
      { new: true }
    );

    console.log("Updated book:", updatedBook);

    return res.status(201).json({
      success: true,
      message: "Borrowed successfully",
      data: borrow,
      updatedBook
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
});


app.get("/api/borrow", async (_req: Request, res: Response) => {
  const borrows = await BorrowedBook.find().populate("bookId");
  res.json({ success: true, books: borrows });
});

// Delete book from db and frontend
app.delete("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // ✅ check if book is currently borrowed
    const activeBorrow = await BorrowedBook.findOne({
      bookId: id,
      isBorrowed: false, // false মানে এখনো return হয়নি (active borrow)
    });

    if (activeBorrow) {
      return res.status(400).json({
        success: false,
        message: "You can't delete this book because it is borrowed.",
      });
    }

    // ✅ যদি borrow না থাকে তাহলে delete
    await Book.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  // console.log({req, res})
  res.send("Welcome to Library Management System Backend");
});

export default app;
