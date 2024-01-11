"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const errors_1 = require("../errors");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Parse log file
 * @param {any} file
 * @returns {Promise<LogResponse[]>}
 */
const parser = async (file) => {
    try {
        const buffer = file.buffer;
        const text = buffer.toString("utf-8");
        const fileArray = text.split("\n");
        const modifyArray = fileArray.filter((data) => ["error", "warn"].includes(data.split(" - ")[1]));
        const logResponse = modifyArray.map((data) => {
            const dataSplit = data.split(" - ");
            const dataObject = JSON.parse(dataSplit[2]);
            return {
                timestamp: new Date(dataSplit[0]).getTime(),
                loglevel: dataSplit[1],
                transactionId: dataObject.transactionId,
                err: dataObject.err,
            };
        });
        return logResponse;
    }
    catch (error) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.FAILED_PARSE);
    }
};
exports.parser = parser;
