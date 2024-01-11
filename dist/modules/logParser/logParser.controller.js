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
exports.logParserBody = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const logParser = __importStar(require("./logParser.service"));
const ApiResponse_1 = __importDefault(require("../ApiMessage/ApiResponse"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const http_status_1 = __importDefault(require("http-status"));
exports.logParserBody = (0, catchAsync_1.default)(async (req, res) => {
    const file = req.file;
    if (!file) {
        res
            .status(http_status_1.default.BAD_REQUEST)
            .send((0, ApiResponse_1.default)(false, ApiMessage_1.default.Error.MISSING_PARAMETER + " " + ApiMessage_1.default.Error.FILE_NOT_FOUND));
        return;
    }
    const logResponse = await logParser.parser(file);
    res.status(http_status_1.default.CREATED).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.PARSED_SUCCESSFULLY, logResponse));
});
