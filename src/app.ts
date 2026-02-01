import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { booksRoutes } from "./app/controllers/books.controllers";
import { borrowedBooksRoutes } from "./app/controllers/borrow.controllers";

const app: Application = express();
app.use(express.json());
app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowedBooksRoutes)





app.get("/", (req: Request, res: Response) => {
  // console.log({req, res})
  res.send("Welcome to Library Management System Backend");
});

export default app;
