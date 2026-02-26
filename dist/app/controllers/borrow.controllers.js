"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedBooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowedBooksRoutes = express_1.default.Router();
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
exports.borrowedBooksRoutes.post("/borrow-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, quantity, dueDate } = req.body;
        // Static method ব্যবহার করা হচ্ছে
        const data = yield borrow_model_1.BorrowedBook.borrowBook(bookId, quantity, dueDate);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
exports.borrowedBooksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield borrow_model_1.BorrowedBook.find().populate("bookId");
        console.log("your all books", books);
        res.status(201).json({
            success: true,
            message: "All Books are shown here",
            books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.borrowedBooksRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.BorrowedBook.aggregate([
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
exports.borrowedBooksRoutes.get("/:borrowId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const books = yield borrow_model_1.BorrowedBook.findById(bookId);
        console.log("your single books", books);
        res.status(201).json({
            success: true,
            message: "All Books are shone here",
            books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.borrowedBooksRoutes.patch("/:borrowId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBooks = req.body;
        const books = yield borrow_model_1.BorrowedBook.findByIdAndUpdate(bookId, updateBooks, {
            new: true,
        });
        console.log("your all books", books);
        res.status(201).json({
            success: true,
            message: "Books info has been update successfully",
            books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.borrowedBooksRoutes.delete("/:borrowId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBooks = req.body;
        const books = yield borrow_model_1.BorrowedBook.findByIdAndDelete(bookId);
        console.log("your book has been deleted successfully", books);
        res.status(201).json({
            success: true,
            message: "Books info has been deleted successfully",
            books,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
