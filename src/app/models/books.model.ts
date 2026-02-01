import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "You must provide Book Title Name"],
      trim: true,
      unique: [true, "Book name should be unique"],
    },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "You are not provide correct generic name. got {VALUE}",
      },
      default: "Personal",
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies cannot be negative. got {VALUE}"],
      validator: Number.isInteger,
      message: "Copies must be a whole number. got {VALUE}",
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Book = model("Book", bookSchema);
