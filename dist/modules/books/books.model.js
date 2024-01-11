"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_1 = __importDefault(require("../toJSON/toJSON"));
const books_interfaces_1 = require("./books.interfaces");
const constants_1 = require("../../config/constants");
const paginate_1 = __importDefault(require("../paginate/paginate"));
const booksSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: books_interfaces_1.statusType,
        required: true,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
booksSchema.plugin(toJSON_1.default);
booksSchema.plugin(paginate_1.default);
/**
 * Check if name is taken
 * @param {string} name - The book's name
 * @param {ObjectId} [excludeBookId] - The id of the book to be excluded
 * @returns {Promise<boolean>}
 */
booksSchema.static("isNameTaken", async function (name, excludeBookId) {
    const book = await this.findOne({ name, _id: { $ne: excludeBookId } });
    return !!book;
});
const Books = mongoose_1.default.model(constants_1.dbCollections.books, booksSchema);
exports.default = Books;
