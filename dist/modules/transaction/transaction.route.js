"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../modules/validate");
const transaction_1 = require("../../modules/transaction");
const auth_middleware_1 = __importDefault(require("../../modules/auth/auth.middleware"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, auth_middleware_1.default)(), (0, validate_1.validate)(transaction_1.transactionValidation.createTransactions), transaction_1.transactionController.createTransaction)
    .get((0, auth_middleware_1.default)(), transaction_1.transactionController.getTransactions);
router
    .route("/:transactionId")
    .get((0, auth_middleware_1.default)(), (0, validate_1.validate)(transaction_1.transactionValidation.getTransaction), transaction_1.transactionController.getTransaction)
    .patch((0, auth_middleware_1.default)(), (0, validate_1.validate)(transaction_1.transactionValidation.updateTransaction), transaction_1.transactionController.updateTransaction)
    .delete((0, auth_middleware_1.default)(), (0, validate_1.validate)(transaction_1.transactionValidation.deleteTransaction), transaction_1.transactionController.deleteTransaction);
const routeArray = [
    {
        path: "/transactions",
        route: router,
    },
];
exports.default = routeArray;
