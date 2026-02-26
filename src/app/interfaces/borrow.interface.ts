import { Model, Types } from "mongoose";

export interface IBorrowedBook {
  bookId: Types.ObjectId; // Mandatory. References the borrowed book’s ID
  quantity: number; // Mandatory. Positive integer (number of copies borrowed)
  dueDate: Date; // Mandatory. The date by which the book must be returned
  isBorrowed: boolean;
}

export interface BorrowedBookModel extends Model<IBorrowedBook> {
  borrowBook(
    bookId: Types.ObjectId,
    quantity: number,
    dueDate: Date,
    isBorrowed: boolean,
  ): Promise<IBorrowedBook>;
}
