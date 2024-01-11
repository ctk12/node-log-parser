"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.getTransactions = exports.createTransactions = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("../validate/custom.validation");
const createTransactionsBody = {
    user_name: joi_1.default.string().required(),
    book_name: joi_1.default.string().required(),
    due_date: joi_1.default.string().required(),
    transaction_type: joi_1.default.string().required(),
};
exports.createTransactions = {
    body: joi_1.default.object().keys(createTransactionsBody),
};
exports.getTransactions = {
    query: joi_1.default.object().keys({
        user_name: joi_1.default.string(),
        book_name: joi_1.default.string(),
        due_date: joi_1.default.string(),
        transaction_type: joi_1.default.string(),
        sortBy: joi_1.default.string(),
        projectBy: joi_1.default.string(),
        limit: joi_1.default.number().integer(),
        page: joi_1.default.number().integer(),
    }),
};
exports.getTransaction = {
    params: joi_1.default.object().keys({
        transactionId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
};
exports.updateTransaction = {
    params: joi_1.default.object().keys({
        transactionId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
    body: joi_1.default.object()
        .keys({
        user_name: joi_1.default.string(),
        book_name: joi_1.default.string(),
        due_date: joi_1.default.string(),
        transaction_type: joi_1.default.string(),
    })
        .min(1),
};
exports.deleteTransaction = {
    params: joi_1.default.object().keys({
        transactionId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
};
