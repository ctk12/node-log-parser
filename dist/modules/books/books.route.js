"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../modules/validate");
const books_1 = require("../../modules/books");
const auth_middleware_1 = __importDefault(require("../../modules/auth/auth.middleware"));
const router = express_1.default.Router();
const router1 = express_1.default.Router();
const router2 = express_1.default.Router();
router
    .route("/")
    .post((0, auth_middleware_1.default)(), (0, validate_1.validate)(books_1.booksValidation.createBooks), books_1.booksController.createBook)
    .get((0, auth_middleware_1.default)(), books_1.booksController.getBooks);
router
    .route("/:bookId")
    .get((0, auth_middleware_1.default)(), (0, validate_1.validate)(books_1.booksValidation.getBook), books_1.booksController.getBook)
    .patch((0, auth_middleware_1.default)(), (0, validate_1.validate)(books_1.booksValidation.updateBook), books_1.booksController.updateBook)
    .delete((0, auth_middleware_1.default)(), (0, validate_1.validate)(books_1.booksValidation.deleteBook), books_1.booksController.deleteBook);
router1.route("/").get((0, auth_middleware_1.default)(), books_1.booksController.getAllBooks);
router2.route("/").get((0, auth_middleware_1.default)(), books_1.booksController.getMyBooks);
const routeArray = [
    {
        path: "/books",
        route: router,
    },
    {
        path: "/all-books",
        route: router1,
    },
    {
        path: "/my-books",
        route: router2,
    },
];
exports.default = routeArray;
