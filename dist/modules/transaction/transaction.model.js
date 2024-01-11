"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_1 = __importDefault(require("../toJSON/toJSON"));
const transaction_interfaces_1 = require("./transaction.interfaces");
const constants_1 = require("../../config/constants");
const paginate_1 = __importDefault(require("../paginate/paginate"));
const transactionsSchema = new mongoose_1.default.Schema({
    user_name: {
        type: String,
        required: true,
    },
    book_name: {
        type: String,
        required: true,
    },
    due_date: {
        type: String,
        required: true,
    },
    transaction_type: {
        type: String,
        enum: transaction_interfaces_1.TransactionType,
        required: true,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
transactionsSchema.plugin(toJSON_1.default);
transactionsSchema.plugin(paginate_1.default);
const Transactions = mongoose_1.default.model(constants_1.dbCollections.transactions, transactionsSchema);
exports.default = Transactions;
