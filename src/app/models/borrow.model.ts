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


// Line by Line ব্যাখ্যা (Bangla)
// - BorrowedBookSchema.statics.borrowBook = async function (...) { ... }
// 👉 এখানে আমরা একটি static method বানাচ্ছি। Static method মানে হলো মডেল লেভেলে ফাংশন থাকবে, যেটা আমরা BorrowedBook.borrowBook(...) দিয়ে কল করতে পারব।
// - const book = await Book.findById(bookId);
// 👉 প্রথমে আমরা Book collection থেকে বই খুঁজে বের করছি। bookId দিয়ে MongoDB থেকে সেই বই বের করা হচ্ছে।
// - if (!book) throw new Error("Book not found");
// 👉 যদি বই না পাওয়া যায়, তাহলে error ছুঁড়ে দিচ্ছি। এতে controller এ গিয়ে 400 response যাবে।
// - if (book.copies < quantity) throw new Error("Not enough copies available");
// 👉 যদি বইয়ের copies সংখ্যা borrow করতে চাওয়া quantity এর চেয়ে কম হয়, তাহলে error ছুঁড়ে দিচ্ছি। অর্থাৎ পর্যাপ্ত বই নেই।
// - book.copies -= quantity;
// 👉 copies কমানো হচ্ছে। উদাহরণ: বইতে যদি 5 copies থাকে আর কেউ 2 copy borrow করে, তাহলে এখন copies হবে 3।
// - if (book.copies === 0) { book.available = false; }
// 👉 যদি copies শূন্য হয়ে যায়, তাহলে available ফ্ল্যাগ false করে দিচ্ছি। অর্থাৎ বই আর borrow করার মতো নেই।
// - await book.save();
// 👉 বইয়ের আপডেট করা copies এবং available status ডাটাবেজে সেভ করা হচ্ছে।
// - return this.create({ book: bookId, quantity, dueDate });
// 👉 BorrowedBook collection এ নতুন borrow রেকর্ড তৈরি করা হচ্ছে। এখানে bookId, quantity, dueDate সেভ হচ্ছে।

// 📌 Controller এ ব্যবহার
// borrowedBooksRoutes.post("/borrow-book", async (req: Request, res: Response) => {
//   try {
//     const { bookId, quantity, dueDate } = req.body;

//     const borrowRecord = await BorrowedBook.borrowBook(bookId, quantity, dueDate);

//     res.status(201).json({
//       success: true,
//       message: "Book borrowed successfully",
//       borrowRecord,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });



// 🔎 Controller ব্যাখ্যা
// - const { bookId, quantity, dueDate } = req.body;
// 👉 ইউজার থেকে আসা ডাটা body থেকে বের করছি।
// - const borrowRecord = await BorrowedBook.borrowBook(...);
// 👉 Static method কল করছি। এর ভেতরে পুরো লজিক আছে (copies চেক, কমানো, available আপডেট, borrow রেকর্ড তৈরি)।
// - res.status(201).json({ ... })
// 👉 সব ঠিক থাকলে success response পাঠাচ্ছি।
// - catch (error)
// 👉 কোনো সমস্যা হলে error response পাঠাচ্ছি।

// ✅ সারসংক্ষেপ (Bangla)
// - Static method borrowBook এর ভেতরে আমরা পুরো লজিক রেখেছি।
// - Controller এ শুধু এক লাইন দিয়ে সেই method কল করলেই সব কাজ হয়ে যায়।
// - এতে কোড clean থাকে, পুনঃব্যবহারযোগ্য হয়, এবং business logic model এর ভেতরে থাকে।


