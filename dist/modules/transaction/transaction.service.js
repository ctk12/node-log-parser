"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionById = exports.updateTransactionById = exports.getTransactionById = exports.queryTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("./transaction.model"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const errors_1 = require("../errors");
const http_status_1 = __importDefault(require("http-status"));
const user_interfaces_1 = require("../user/user.interfaces");
/**
 * Create a Transaction
 * @param {NewCreatedTransactions} transactionBody
 * @returns {Promise<ITransactionsDoc>}
 */
const createTransaction = async (transactionBody) => {
    const { user_name, book_name, due_date, transaction_type } = transactionBody;
    if (await transaction_model_1.default.findOne({ user_name, book_name, due_date, transaction_type })) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.TRANSACTION_EXITS);
    }
    return transaction_model_1.default.create(transactionBody);
};
exports.createTransaction = createTransaction;
/**
 * Get Transactions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {IUser} user - check is admin
 * @returns {Promise<QueryResult>}
 */
const queryTransactions = async (filter, options, user) => {
    let transactions;
    if (user.role === user_interfaces_1.roleType.ADMIN) {
        transactions = await transaction_model_1.default.paginate(filter, options);
    }
    else {
        filter.user_name = user.user_name;
        transactions = await transaction_model_1.default.paginate(filter, options);
    }
    return transactions;
};
exports.queryTransactions = queryTransactions;
/**
 * Get Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<IUserDocCustomer | null>}
 */
const getTransactionById = async (transactionId) => transaction_model_1.default.findById(transactionId);
exports.getTransactionById = getTransactionById;
/**
 * Update Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @param {UpdateTransactionsBody} updateBody
 * @returns {Promise<ITransactionsDoc | null>}
 */
const updateTransactionById = async (transactionId, updateBody) => {
    const transaction = await (0, exports.getTransactionById)(transactionId);
    if (!transaction) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    Object.assign(transaction, updateBody);
    await transaction.save();
    return transaction;
};
exports.updateTransactionById = updateTransactionById;
/**
 * Delete Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<ITransactionsDoc | null>}
 */
const deleteTransactionById = async (transactionId) => {
    const transaction = await (0, exports.getTransactionById)(transactionId);
    if (!transaction) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    await transaction.deleteOne();
    return transaction;
};
exports.deleteTransactionById = deleteTransactionById;
