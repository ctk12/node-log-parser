"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./modules/errors");
const http_status_1 = __importDefault(require("http-status"));
const ApiMessage_1 = __importDefault(require("./modules/ApiMessage/ApiMessage"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
// set security HTTP headers
app.use((0, helmet_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// sanitize request data
app.use((0, xss_clean_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api", routes_1.default);
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_FOUND));
});
// convert error to ApiError, if needed
app.use(errors_1.errorConverter);
// handle error
app.use(errors_1.errorHandler);
exports.default = app;
