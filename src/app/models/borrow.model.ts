// import { Schema, model, Types } from "mongoose";

// const BorrowedBookSchema = new Schema(
//   {
//     book: {
//       type: Types.ObjectId,
//       ref: "Book",       // References the Book collection
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: [1, "Quantity must be at least 1"], // Positive integer constraint
//     },
//     dueDate: {
//       type: Date,
//       required: true,
//     },
//   },
//   {
//     versionKey: false,// versionKey will be removed from DB
//     timestamps: true, // Adds createdAt and updatedAt fields automatically
//   }
// );

// export const BorrowedBook = model("BorrowedBook", BorrowedBookSchema);

import { Schema, model, Types, Model } from "mongoose";
import { Book } from "./books.model";
import { BorrowedBookModel, IBorrowedBook } from "../interfaces/borrow.interface";


const BorrowedBookSchema = new Schema<IBorrowedBook>(
  {
    bookId: {
      type: Types.ObjectId,
      ref: "Book",       // References the Book collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"], // Positive integer constraint
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,// versionKey will be removed from DB
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// 👉 Static method
BorrowedBookSchema.statics.borrowBook = async function (
  bookId: Types.ObjectId,
  quantity: number,
  dueDate: Date
) {
  const book = await Book.findById(bookId);

  if (!book) throw new Error("Book not found");
  if (book.copies < quantity) throw new Error("Not enough copies available");

  // Copies কমানো
  book.copies -= quantity;

  // যদি copies == 0 হয়, available false করে দাও
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();

  // Borrow রেকর্ড তৈরি
  return this.create({ bookId: bookId, quantity, dueDate });
};

export const BorrowedBook = model<IBorrowedBook, BorrowedBookModel>(
  "BorrowedBook",
  BorrowedBookSchema
);