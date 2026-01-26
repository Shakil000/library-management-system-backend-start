import { Types } from "mongoose";

export interface IBorrowedBook {
  book: Types.ObjectId;   // Mandatory. References the borrowed book’s ID
  quantity: number;       // Mandatory. Positive integer (number of copies borrowed)
  dueDate: Date;          // Mandatory. The date by which the book must be returned
}