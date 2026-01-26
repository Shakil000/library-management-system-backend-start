import { Schema, model, Types } from "mongoose";

const BorrowedBookSchema = new Schema(
  {
    book: {
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
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const BorrowedBook = model("BorrowedBook", BorrowedBookSchema);