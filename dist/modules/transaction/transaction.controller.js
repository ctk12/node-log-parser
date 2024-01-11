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
exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.getTransactions = exports.createTransaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const TransactionsService = __importStar(require("./transaction.service"));
const ApiResponse_1 = __importDefault(require("../ApiMessage/ApiResponse"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../errors");
const pick_1 = __importDefault(require("../utils/pick"));
exports.createTransaction = (0, catchAsync_1.default)(async (req, res) => {
    const transaction = await TransactionsService.createTransaction(req.body);
    res.status(http_status_1.default.CREATED).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.CREATED_SUCCESSFULLY, transaction));
});
exports.getTransactions = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.default)(req.query, ["user_name", "book_name", "due_date", "transaction_type"]);
    const options = (0, pick_1.default)(req.query, ["sortBy", "limit", "page", "projectBy"]);
    const result = await TransactionsService.queryTransactions(filter, options, req.user);
    res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
exports.getTransaction = (0, catchAsync_1.default)(async (req, res) => {
    const { transactionId } = req.params;
    const transactionIdObj = new mongoose_1.default.Types.ObjectId(transactionId);
    if (transactionIdObj) {
        const transaction = await TransactionsService.getTransactionById(transactionIdObj);
        if (!transaction) {
            throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, transaction));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.updateTransaction = (0, catchAsync_1.default)(async (req, res) => {
    const { transactionId } = req.params;
    const transactionIdObj = new mongoose_1.default.Types.ObjectId(transactionId);
    if (transactionIdObj) {
        const transaction = await TransactionsService.updateTransactionById(transactionIdObj, req.body);
        if (!transaction) {
            throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.UPDATED_SUCCESSFULLY, transaction));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.deleteTransaction = (0, catchAsync_1.default)(async (req, res) => {
    const { transactionId } = req.params;
    const transactionIdObj = new mongoose_1.default.Types.ObjectId(transactionId);
    if (transactionIdObj) {
        await TransactionsService.deleteTransactionById(transactionIdObj);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.DELETED_SUCCESSFULLY));
    }
    else {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
