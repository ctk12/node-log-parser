"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBooks = exports.getAllBooks = exports.deleteBook = exports.updateBook = exports.getBook = exports.getBooks = exports.createBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const booksService = __importStar(require("./books.service"));
const ApiResponse_1 = __importDefault(require("../ApiMessage/ApiResponse"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../errors");
const pick_1 = __importDefault(require("../utils/pick"));
exports.createBook = (0, catchAsync_1.default)(async (req, res) => {
    const book = await booksService.createBook(req.body);
    res.status(http_status_1.default.CREATED).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.CREATED_SUCCESSFULLY, book));
});
exports.getBooks = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.default)(req.query, ["name", "author", "status"]);
    const options = (0, pick_1.default)(req.query, ["sortBy", "limit", "page", "projectBy"]);
    const result = await booksService.queryBooks(filter, options);
    res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
exports.getBook = (0, catchAsync_1.default)(async (req, res) => {
    const { bookId } = req.params;
    const bookIdObj = new mongoose_1.default.Types.ObjectId(bookId);
    if (bookIdObj) {
        const book = await booksService.getBookById(bookIdObj);
        if (!book) {
            throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, book));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.updateBook = (0, catchAsync_1.default)(async (req, res) => {
    const { bookId } = req.params;
    const bookIdObj = new mongoose_1.default.Types.ObjectId(bookId);
    if (bookIdObj) {
        const book = await booksService.updateBookById(bookIdObj, req.body);
        if (!book) {
            throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.UPDATED_SUCCESSFULLY, book));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    const { bookId } = req.params;
    const bookIdObj = new mongoose_1.default.Types.ObjectId(bookId);
    if (bookIdObj) {
        await booksService.deleteBookById(bookIdObj);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.DELETED_SUCCESSFULLY));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booksService.queryAllBooks();
    res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
exports.getMyBooks = (0, catchAsync_1.default)(async (req, res) => {
    const result = await booksService.queryMyBooks(req.user);
    res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
