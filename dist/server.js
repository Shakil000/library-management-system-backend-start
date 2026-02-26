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
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require("mongoose");
const app_1 = __importDefault(require("./app"));
let server;
const port = 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect("mongodb+srv://shakil000:shakil000@cluster0.glpjidx.mongodb.net/library-management-system?appName=Cluster0");
            console.log("Connected to mongoDB using Mongoose");
            server = app_1.default.listen(port, () => {
                console.log(`Library Management System Backend is listening on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
