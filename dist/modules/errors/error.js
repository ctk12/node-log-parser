"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config/config"));
const ApiError_1 = __importDefault(require("./ApiError"));
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.default)) {
        const statusCode = error.statusCode;
        const message = error.message || `${http_status_1.default[statusCode]}`;
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    const { statusCode, message } = err;
    res.locals["errorMessage"] = err.message;
    const response = Object.assign({ success: false, message: message.replace(/[^a-zA-Z0-9/_/./ ]/g, "") }, (config_1.default.env === "development" && { stack: err.stack }));
    if (config_1.default.env === "development") {
        console.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
