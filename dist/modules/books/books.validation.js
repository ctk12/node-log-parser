"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBook = exports.getBookAll = exports.createBooks = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("../validate/custom.validation");
const createBooksBody = {
    name: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
};
exports.createBooks = {
    body: joi_1.default.object().keys(createBooksBody),
};
exports.getBookAll = {
    params: joi_1.default.object().keys({
        bookId: joi_1.default.string().optional(),
    }),
};
exports.getBook = {
    params: joi_1.default.object().keys({
        bookId: joi_1.default.custom(custom_validation_1.objectId),
    }),
};
exports.updateBook = {
    params: joi_1.default.object().keys({
        bookId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
    body: joi_1.default.object()
        .keys({
        name: joi_1.default.string(),
        author: joi_1.default.string(),
        status: joi_1.default.string(),
    })
        .min(1),
};
exports.deleteBook = {
    params: joi_1.default.object().keys({
        bookId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
};
