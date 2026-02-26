/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import mongoose = require("mongoose");
import app from "./app";



let server: Server;
const port = 3000;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://shakil000:shakil000@cluster0.glpjidx.mongodb.net/library-management-system?appName=Cluster0");
    console.log("Connected to mongoDB using Mongoose")
    server = app.listen(port, () => {
      console.log(`Library Management System Backend is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();